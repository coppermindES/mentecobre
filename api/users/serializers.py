from django.db import transaction
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
            "status_changed_at",
        ]
        read_only_fields = ["id", "status_changed_at"]

    def update(self, instance, validated_data):
        previous_status = instance.status
        new_status = validated_data.get("status", previous_status)
        changed_by = self.context["request"].user

        with transaction.atomic():
            instance = super().update(instance, validated_data)

            if previous_status != new_status:
                UserStatusLog.objects.create(
                    user=instance,
                    status=new_status,
                    changed_by=changed_by,
                )

        return instance


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
