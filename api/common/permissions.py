from rest_framework.permissions import BasePermission


class CanEditAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True

        return request.user.groups.filter(name="Admins").exists()
