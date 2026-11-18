import pytest
from django.urls import reverse
from mentecobre.models import Article
from rest_framework import status

pytestmark = pytest.mark.django_db

ARTICLES_URL = reverse("api_v1:mentecobre:articles-list")

_ACTION_NAMES = {
    "assign_translator": "articles-assign-translator",
    "mark_translated": "articles-mark-translated",
    "assign_reviewer": "articles-assign-reviewer",
    "mark_reviewed": "articles-mark-reviewed",
    "assign_gregorio": "articles-assign-gregorio",
    "mark_gregorio": "articles-mark-engregoriado",
}


def _detail_url(article):
    return reverse("api_v1:mentecobre:articles-detail", args=[article.pk])


def _action_url(article, action):
    return reverse(f"api_v1:mentecobre:{_ACTION_NAMES[action]}", args=[article.pk])


def _next_url(action):
    return reverse(f"api_v1:mentecobre:articles-next-to-{action}")


class TestArticleViewSet:
    # Tests LIST articles
    def test_anonymous_cannot_list_articles(self, api_client):
        response = api_client.get(ARTICLES_URL)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user", "admin_user"])
    def test_user_with_role_can_list_articles(self, api_client,request, user_fixture, article):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.get(ARTICLES_URL)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    @pytest.mark.parametrize("user_fixture", ["no_role_user", "inactive_user"])
    def test_unauthorized_users_cannot_list_articles(self, api_client, request, user_fixture):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.get(ARTICLES_URL)

        assert response.status_code == status.HTTP_403_FORBIDDEN

    # Tests PATCH articles
    def test_translator_can_patch_allowed_fields(self, api_client, translator_user, article):
        api_client.force_authenticate(user=translator_user)

        response = api_client.patch(_detail_url(article), {"notes": "Nota del traductor"}, format="json")

        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.notes == "Nota del traductor"

    def test_translator_cannot_patch_forbidden_fields(self, api_client, translator_user, article):
        api_client.force_authenticate(user=translator_user)

        response = api_client.patch(_detail_url(article), {"priority": 1}, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        article.refresh_from_db()
        assert article.priority is None

    # Test CREATE articles
    def test_translator_cannot_create_article(self, api_client, translator_user):
        api_client.force_authenticate(user=translator_user)

        response = api_client.post(ARTICLES_URL, {}, format="json")

        assert response.status_code == status.HTTP_403_FORBIDDEN

    @pytest.mark.parametrize("user_fixture", ["reviewer_user", "admin_user"])
    def test_reviewer_and_admin_reach_create_validation(self, api_client, request, user_fixture):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.post(ARTICLES_URL, {}, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    # Test DELETE articles
    def test_translator_cannot_delete_article(self, api_client, translator_user, article):
        api_client.force_authenticate(user=translator_user)

        response = api_client.delete(_detail_url(article))

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert Article.objects.filter(pk=article.pk).exists()

    @pytest.mark.parametrize("user_fixture", ["reviewer_user", "admin_user"])
    def test_reviewer_admin_can_delete_article(self, api_client, request, user_fixture, article):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.delete(_detail_url(article))

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Article.objects.filter(pk=article.pk).exists()

    # Test Assign Translator
    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user", "admin_user"])
    def test_user_with_role_can_assign_self_as_translator(self, api_client, request, user_fixture, article):
        user = request.getfixturevalue(user_fixture)
        api_client.force_authenticate(user=user)

        response = api_client.post(_action_url(article, "assign_translator"))

        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.translator == user
        assert article.status == Article.Status.TRANSLATING

    # Test Mark Translated
    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user", "admin_user"])
    def test_user_with_role_can_mark_own_article_as_translated(self, api_client, request, user_fixture, article):
        user = request.getfixturevalue(user_fixture)
        article.status = Article.Status.TRANSLATING
        article.translator = user
        article.save()
        api_client.force_authenticate(user=user)

        response = api_client.post(_action_url(article, "mark_translated"))

        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.status == Article.Status.TRANSLATED

    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user", "admin_user"])
    def test_user_with_role_cannot_mark_other_article_as_translated(self, api_client, request, user_fixture, article):
        user = request.getfixturevalue(user_fixture)
        article.status = Article.Status.TRANSLATING
        article.save()
        api_client.force_authenticate(user=user)

        response = api_client.post(_action_url(article, "mark_translated"))
        assert response.status_code == status.HTTP_403_FORBIDDEN

    # Test Assign Reviewer
    def test_translator_cannot_assign_reviewer(self, api_client, translator_user, article):
        article.status = Article.Status.TRANSLATED
        article.save()
        api_client.force_authenticate(user=translator_user)

        response = api_client.post(_action_url(article, "assign_reviewer"))

        assert response.status_code == status.HTTP_403_FORBIDDEN

    @pytest.mark.parametrize("user_fixture", ["reviewer_user", "admin_user"])
    def test_reviewer_or_admin_can_assign_reviewer(self, api_client, request, user_fixture, article):
        user = request.getfixturevalue(user_fixture)
        article.status = Article.Status.TRANSLATED
        article.save()
        api_client.force_authenticate(user=user)

        response = api_client.post(_action_url(article, "assign_reviewer"))

        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.reviewer == user
        assert article.status == Article.Status.REVIEWING

    # Test Mark Reviewed
    @pytest.mark.parametrize("user_fixture", ["reviewer_user", "admin_user"])
    def test_assigned_reviewer_or_admin_can_mark_as_reviewed(self, api_client, request, user_fixture, article):
        user = request.getfixturevalue(user_fixture)
        article.status = Article.Status.REVIEWING
        article.reviewer = user
        article.save()
        api_client.force_authenticate(user=user)

        response = api_client.post(_action_url(article, "mark_reviewed"))

        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.status == Article.Status.REVIEWED

    # Test Assign Gregorio
    def test_reviewer_cannot_assign_gregorio(self, api_client, reviewer_user, article):
        article.status = Article.Status.REVIEWED
        article.save()
        api_client.force_authenticate(user=reviewer_user)

        response = api_client.post(_action_url(article, "assign_gregorio"))

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_admin_can_assign_gregorio(self, api_client, admin_user, article):
        article.status = Article.Status.REVIEWED
        article.save()
        api_client.force_authenticate(user=admin_user)

        response = api_client.post(_action_url(article, "assign_gregorio"))

        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.gregorio == admin_user
        assert article.status == Article.Status.GREGORING

    # Test Mark Gregorio
    def test_assigned_gregorio_can_mark_as_engregoriado(self, api_client, admin_user, article):
        article.status = Article.Status.GREGORING
        article.gregorio = admin_user
        article.save()
        api_client.force_authenticate(user=admin_user)

        response = api_client.post(_action_url(article, "mark_gregorio"))

        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.status == Article.Status.GREGORIADO

    # Test Next to Translate
    def test_next_to_translate_returns_article_from_user_universe(self, api_client, translator_user, universe, article):
        translator_user.universe.add(universe)
        api_client.force_authenticate(user=translator_user)

        response = api_client.get(_next_url("translate"))

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["title_en"] == article.page_en.title
        assert response.data[0]["universe_name"] == universe.name

    def test_translator_cannot_access_next_to_review(self, api_client, translator_user):
        api_client.force_authenticate(user=translator_user)

        response = api_client.get(_next_url("review"))

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_reviewer_cannot_access_next_to_gregorio(self, api_client, reviewer_user):
        api_client.force_authenticate(user=reviewer_user)

        response = api_client.get(_next_url("gregorio"))

        assert response.status_code == status.HTTP_403_FORBIDDEN