from rest_framework.routers import DefaultRouter

from universe.views import UniverseViewSet

app_name = 'universe'

router = DefaultRouter()

router.register(r'universe', UniverseViewSet, basename='universe')

urlpatterns = router.urls