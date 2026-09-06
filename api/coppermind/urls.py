from coppermind.views import CoppermindViewSet
from rest_framework.routers import DefaultRouter

app_name = "coppermind"

router = DefaultRouter()

router.register(r"coppermind", CoppermindViewSet, basename="coppermind")

urlpatterns = router.urls
