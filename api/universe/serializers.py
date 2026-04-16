from rest_framework import serializers

from universe.models import Universe


class UniverseSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Universe
        fields = ['id', 'name']
