from rest_framework import serializers
from universe.models import Universe
from users.models import User, UserStatusLog


class UserSerializer(serializers.ModelSerializer):
    universe = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Universe.objects.all(),
        required=False,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "universe",
            "notes",
            "status",
        ]
        read_only_fields = ["id"]


class UserStatusLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStatusLog
        fields = [
            "id",
            "user",
            "status",
            "changed_at",
            "changed_by",
            "note",
        ]
        read_only_fields = ["id", "changed_at"]
