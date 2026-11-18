from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "api_v1"

urlpatterns = [
    path("", include("universe.urls")),
    path("", include("users.urls")),
    path("", include("mentecobre.urls")),
    path("", include("coppermind.urls")),
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
]
