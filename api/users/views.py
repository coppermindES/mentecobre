from common.permissions import IsAdmin, IsTranslatorOrAbove
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from users.models import User, UserStatusLog
from users.serializers import UserSerializer, UserStatusLogSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.prefetch_related("universe").order_by("id").all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def get_permissions(self):
        if self.action in {"me"}:
            return [IsTranslatorOrAbove()]

        return super().get_permissions()

    @action(detail=False, methods=["get"])
    def me(self, request):
        return Response(self.get_serializer(request.user).data)

    @action(detail=False, methods=["get"])
    def count(self, request):
        return Response({"count": User.objects.count()})


class UserStatusLogViewSet(ReadOnlyModelViewSet):
    queryset = UserStatusLog.objects.select_related("user", "changed_by").order_by("-changed_at").all()
    serializer_class = UserStatusLogSerializer
    permission_classes = [IsAdmin]
