from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet


# Create your views here.
class UserView(ModelViewSet):
    queryset = User.objects.all()


