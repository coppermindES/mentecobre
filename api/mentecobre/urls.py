from mentecobre.views import ArticleViewSet
from rest_framework.routers import DefaultRouter

app_name = "mentecobre"

router = DefaultRouter()

router.register(r"articles", ArticleViewSet, basename="articles")

urlpatterns = router.urls
