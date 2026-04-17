from django.urls import include, path

app_name = "api_v1"

urlpatterns = [
    path("", include("universe.urls")),
    path("", include("users.urls")),
]
