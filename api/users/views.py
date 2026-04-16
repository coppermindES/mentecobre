from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from users.models import User, UserStatusLog
from users.serializers import UserSerializer, UserStatusLogSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.prefetch_related("universe").all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self):
        response = self.serializer_class(instance=self.request.user)
        return response

    @action(detail=False, methods=['get'])
    def count(self):
        return User.objects.count()

class UserStatusLogViewSet(ReadOnlyModelViewSet):
    queryset = UserStatusLog.objects.select_related("user", "changed_by").all()
    serializer_class = UserStatusLogSerializer
    permission_classes = [IsAuthenticated]

