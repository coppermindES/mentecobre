from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from common.permissions import IsAdmin
from universe.models import Universe
from universe.serializers import UniverseSerializer


# Create your views here.
class UniverseViewSet(ModelViewSet):
    queryset = Universe.objects.all()
    pagination_class = PageNumberPagination
    serializer_class = UniverseSerializer
    permission_classes = [IsAdmin]

    @action(detail=False, methods=["get"])
    def count(self):
        return self.queryset.count()
