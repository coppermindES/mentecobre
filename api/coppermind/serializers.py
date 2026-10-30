from coppermind.models import Page
from rest_framework import serializers


class UpdatePagesSerializer(serializers.Serializer):
    language = serializers.CharField()
    namespaces = serializers.ListField(child=serializers.IntegerField(), required=False)


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = "__all__"
