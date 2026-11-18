from rest_framework.permissions import BasePermission
from users.models import RoleEnum, UserStatus


class HasRole(BasePermission):
    allowed_roles = ()
    message = "No tienes el rol necesario para realizar esta acción."

    def has_permission(self, request, view):
        user = request.user

        if not user:
            return False

        if not user.is_authenticated:
            return False

        if user.status != UserStatus.ACTIVE:
            return False

        if not user.role_id:
            return False

        allowed_keys = [role.value for role in self.allowed_roles]
        return user.role.key in allowed_keys

class IsTranslatorOrAbove(HasRole):
    allowed_roles = (
        RoleEnum.TRANSLATOR,
        RoleEnum.REVIEWER,
        RoleEnum.ADMIN,
    )


class IsReviewerOrAdmin(HasRole):
    allowed_roles = (
        RoleEnum.REVIEWER,
        RoleEnum.ADMIN,
    )


class IsAdmin(HasRole):
    allowed_roles = (RoleEnum.ADMIN,)