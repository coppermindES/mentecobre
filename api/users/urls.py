from rest_framework.routers import DefaultRouter

from users.views import UserViewSet, UserStatusLogViewSet

app_name = 'users'

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'users/logs', UserStatusLogViewSet, basename='users-logs')

urlpatterns = router.urls