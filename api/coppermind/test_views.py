import pytest
from coppermind.models import Page
from coppermind.views import CoppermindViewSet
from django.urls import reverse
from rest_framework import status

pytestmark = pytest.mark.django_db

COPPERMIND_URL = reverse("api_v1:coppermind:coppermind-list")
UPDATE_PAGES_URL = reverse("api_v1:coppermind:coppermind-update-pages")
UPDATE_PAGES_STATUS_URL = reverse("api_v1:coppermind:coppermind-update-pages-status")


def _detail_url(page):
    return reverse("api_v1:coppermind:coppermind-detail", args=[page.pk])


class TestCoppermindViewSet:
    def test_anonymous_cannot_list_pages(self, api_client):
        response = api_client.get(COPPERMIND_URL)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user", "no_role_user"])
    def test_non_admin_cannot_list_pages(self, api_client, request, user_fixture):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.get(COPPERMIND_URL)

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_admin_can_list_and_retrieve_pages(self, api_client, admin_user, page):
        api_client.force_authenticate(user=admin_user)

        list_response = api_client.get(COPPERMIND_URL)
        detail_response = api_client.get(_detail_url(page))

        assert list_response.status_code == status.HTTP_200_OK
        assert list_response.data["count"] == 1
        assert detail_response.status_code == status.HTTP_200_OK
        assert detail_response.data["title"] == page.title
        assert detail_response.data["page_id"] == page.page_id

    def test_admin_can_create_update_and_delete_page(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)
        payload = {
            "wiki": "en",
            "page_id": 3001,
            "ns": 0,
            "title": "Shallan",
            "touched": "2026-11-18T10:00:00Z",
            "fullurl": "https://coppermind.net/wiki/Shallan",
            "editurl": "https://coppermind.net/wiki/Shallan?action=edit",
        }

        created = api_client.post(COPPERMIND_URL, payload, format="json")
        assert created.status_code == status.HTTP_201_CREATED, created.data
        page = Page.objects.get(page_id=3001)

        updated = api_client.patch(_detail_url(page), {"title": "Shallan Davar"}, format="json")
        assert updated.status_code == status.HTTP_200_OK
        page.refresh_from_db()
        assert page.title == "Shallan Davar"

        deleted = api_client.delete(_detail_url(page))
        assert deleted.status_code == status.HTTP_204_NO_CONTENT
        assert not Page.objects.filter(pk=page.pk).exists()

    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user"])
    def test_non_admin_cannot_update_pages(self, api_client, request, user_fixture):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.post(UPDATE_PAGES_URL, {"language": "en"}, format="json")

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_admin_can_update_pages(self, api_client, admin_user, monkeypatch):
        calls = []

        def fake_update_pages(language, namespaces):
            calls.append((language, namespaces))
            return {"result": "ok"}

        monkeypatch.setattr(CoppermindViewSet.MANAGER, "update_pages", fake_update_pages)
        api_client.force_authenticate(user=admin_user)

        response = api_client.post(
            UPDATE_PAGES_URL,
            {"language": "en", "namespaces": [0, 4]},
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"result": "ok"}
        assert calls == [("en", [0, 4])]

    def test_update_pages_requires_language(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)

        response = api_client.post(UPDATE_PAGES_URL, {"namespaces": [0]}, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user"])
    def test_non_admin_cannot_read_update_status(self, api_client, request, user_fixture):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.get(UPDATE_PAGES_STATUS_URL, {"thread_id": "abc"})

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_admin_can_read_update_status(self, api_client, admin_user, monkeypatch):
        monkeypatch.setattr(
            CoppermindViewSet.MANAGER,
            "get_thread_status_from_cache",
            lambda thread_id: "Completed" if thread_id == "abc" else None,
        )
        api_client.force_authenticate(user=admin_user)

        found = api_client.get(UPDATE_PAGES_STATUS_URL, {"thread_id": "abc"})
        missing = api_client.get(UPDATE_PAGES_STATUS_URL, {"thread_id": "unknown"})

        assert found.status_code == status.HTTP_200_OK
        assert found.data == {"status": "Completed"}
        assert missing.status_code == status.HTTP_404_NOT_FOUND
