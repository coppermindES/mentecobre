import pytest
from django.urls import reverse
from rest_framework import status
from users.models import User, UserStatus, UserStatusLog

pytestmark = pytest.mark.django_db

USERS_URL = reverse("api_v1:users:users-list")
LOGS_URL = reverse("api_v1:users:users-logs-list")


def _detail_url(user):
    return reverse("api_v1:users:users-detail", args=[user.pk])


class TestUserViewSet:
    def test_anonymous_cannot_list_users(self, api_client):
        response = api_client.get(USERS_URL)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_admin_can_list_users(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)

        response = api_client.get(USERS_URL)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == User.objects.count()
        usernames = {entry["username"] for entry in response.data["results"]}
        assert admin_user.username in usernames

    @pytest.mark.parametrize("user_fixture", ["translator_user", "reviewer_user"])
    def test_non_admin_users_cannot_list_users(self, api_client, request, user_fixture):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.get(USERS_URL)

        assert response.status_code == status.HTTP_403_FORBIDDEN

    @pytest.mark.parametrize("user_fixture", ["no_role_user", "inactive_user"])
    def test_unauthorized_users_cannot_list_users(self, api_client, request, user_fixture):
        api_client.force_authenticate(user=request.getfixturevalue(user_fixture))

        response = api_client.get(USERS_URL)

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_retrieve_user(self, api_client, admin_user, translator_user):
        api_client.force_authenticate(user=admin_user)

        response = api_client.get(_detail_url(translator_user))

        assert response.status_code == status.HTTP_200_OK
        assert response.data["username"] == translator_user.username
        assert response.data["role"] == "Traductor"

    def test_me_returns_current_user(self, api_client, translator_user):
        api_client.force_authenticate(user=translator_user)

        response = api_client.get(reverse("api_v1:users:users-me"))

        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == translator_user.pk
        assert response.data["username"] == translator_user.username

    def test_count_returns_number_of_users(self, api_client, admin_user, translator_user, reviewer_user):
        api_client.force_authenticate(user=admin_user)

        response = api_client.get(reverse("api_v1:users:users-count"))

        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"count": User.objects.count()}

    def test_translator_cannot_create_user(self, api_client, translator_user):
        api_client.force_authenticate(user=translator_user)

        response = api_client.post(USERS_URL, {"username": "new-user"}, format="json")

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert not User.objects.filter(username="new-user").exists()

    def test_admin_can_create_user(self, api_client, admin_user, universe):
        api_client.force_authenticate(user=admin_user)
        payload = {
            "username": "new-user",
            "email": "new-user@example.com",
            "role": "translator",
            "universe": universe.name,
            "status": "Activo",
        }

        response = api_client.post(USERS_URL, payload, format="json")

        assert response.status_code == status.HTTP_201_CREATED, response.data
        created = User.objects.get(username="new-user")
        assert created.role.key == "translator"
        assert list(created.universe.values_list("name", flat=True)) == [universe.name]
        assert response.data["role"] == "Traductor"

    def test_translator_cannot_delete_user(self, api_client, translator_user, reviewer_user):
        api_client.force_authenticate(user=translator_user)

        response = api_client.delete(_detail_url(reviewer_user))

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert User.objects.filter(pk=reviewer_user.pk).exists()

    def test_admin_can_delete_user(self, api_client, admin_user, translator_user):
        api_client.force_authenticate(user=admin_user)

        response = api_client.delete(_detail_url(translator_user))

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not User.objects.filter(pk=translator_user.pk).exists()

    def test_status_change_creates_log(self, api_client, admin_user, translator_user):
        api_client.force_authenticate(user=admin_user)

        response = api_client.patch(
            _detail_url(translator_user),
            {"status": "Descanso"},
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK, response.data
        translator_user.refresh_from_db()
        assert translator_user.status == UserStatus.REST
        assert UserStatusLog.objects.filter(
            user=translator_user,
            status=UserStatus.REST,
            changed_by=admin_user,
        ).exists()


class TestUserStatusLogViewSet:
    def test_only_admin_can_read_status_logs(self, api_client, translator_user, admin_user):
        api_client.force_authenticate(user=translator_user)
        assert api_client.get(LOGS_URL).status_code == status.HTTP_403_FORBIDDEN

        api_client.force_authenticate(user=admin_user)
        assert api_client.get(LOGS_URL).status_code == status.HTTP_200_OK
