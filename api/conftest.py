import pytest
from coppermind.models import Page, Wiki
from django.utils import timezone
from mentecobre.models import Article
from rest_framework.test import APIClient
from universe.models import Universe
from users.models import Role, RoleEnum, User, UserStatus

def pytest_configure():
    pass


@pytest.fixture
def roles(db):
    return {
        role_enum: Role.objects.get_or_create(key=role_enum.value)[0]
        for role_enum in RoleEnum
    }


def _create_user(username, roles, role_enum=None, **extra):
    return User.objects.create_user(
        username=username,
        password="test-pass-123",
        role=roles[role_enum] if role_enum else None,
        **extra,
    )


@pytest.fixture
def translator_user(db, roles):
    return _create_user("translator", roles, RoleEnum.TRANSLATOR)


@pytest.fixture
def reviewer_user(db, roles):
    return _create_user("reviewer", roles, RoleEnum.REVIEWER)


@pytest.fixture
def admin_user(db, roles):
    return _create_user("admin", roles, RoleEnum.ADMIN)


@pytest.fixture
def no_role_user(db, roles):
    return _create_user("no-role", roles)


@pytest.fixture
def inactive_user(db, roles):
    return _create_user(
        "inactive",
        roles,
        RoleEnum.TRANSLATOR,
        status=UserStatus.INACTIVE,
    )


@pytest.fixture
def superuser(db):
    return User.objects.create_superuser(
        username="root",
        email="root@example.com",
        password="test-pass-123",
    )


@pytest.fixture
def universe(db):
    return Universe.objects.create(name="Stormlight")


@pytest.fixture
def article(db, universe):
    page_en = Page.objects.create(
        wiki=Wiki.EN,
        page_id=1001,
        ns=0,
        title="Kaladin",
        touched=timezone.now(),
        fullurl="https://coppermind.net/wiki/Kaladin",
        editurl="https://coppermind.net/wiki/Kaladin?action=edit",
    )
    page_es = Page.objects.create(
        wiki=Wiki.ES,
        page_id=1002,
        ns=0,
        title="Kaladin (ES)",
        touched=timezone.now(),
        fullurl="https://coppermind.net/es/wiki/Kaladin",
        editurl="https://coppermind.net/es/wiki/Kaladin?action=edit",
    )
    return Article.objects.create(
        page_en=page_en,
        page_es=page_es,
        universe=universe,
    )


@pytest.fixture
def page(db):
    return Page.objects.create(
        wiki=Wiki.EN,
        page_id=2001,
        ns=0,
        title="Dalinar",
        touched=timezone.now(),
        fullurl="https://coppermind.net/wiki/Dalinar",
        editurl="https://coppermind.net/wiki/Dalinar?action=edit",
    )


@pytest.fixture
def api_client():
    return APIClient()
