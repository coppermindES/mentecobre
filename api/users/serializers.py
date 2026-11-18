from django.db import transaction
from rest_framework import serializers
from universe.models import Universe
from users.models import Role, RoleEnum, User, UserStatus, UserStatusLog

ROLE_LOOKUP = {str(label).lower(): value for value, label in RoleEnum.choices}
ROLE_LOOKUP.update({value: value for value, _ in RoleEnum.choices})

STATUS_LOOKUP = {str(label).lower(): value for value, label in UserStatus.choices}
STATUS_LOOKUP.update({value: value for value, _ in UserStatus.choices})


class RoleField(serializers.Field):
    """Expone el rol en español y acepta su clave o su nombre."""

    def to_representation(self, value):
        return value.name if value is not None else None

    def to_internal_value(self, data):
        key = ROLE_LOOKUP.get(str(data).lower())
        if key is None:
            raise serializers.ValidationError("Rol no válido.")
        try:
            return Role.objects.get(key=key)
        except Role.DoesNotExist as exc:
            raise serializers.ValidationError("Rol no válido.") from exc


class StatusField(serializers.Field):
    """Expone el estado en español y acepta su clave o su nombre."""

    def to_representation(self, value):
        return dict(UserStatus.choices).get(value, value)

    def to_internal_value(self, data):
        key = STATUS_LOOKUP.get(str(data).lower())
        if key is None:
            raise serializers.ValidationError("Estado no válido.")
        return key


class UniverseField(serializers.Field):
    """Expone el primer universo como texto y lo convierte en M2M al escribir."""

    def to_representation(self, value):
        universe = value.first()
        return universe.name if universe else None

    def to_internal_value(self, data):
        try:
            return [Universe.objects.get(name=data)]
        except Universe.DoesNotExist as exc:
            raise serializers.ValidationError("Universo no válido.") from exc


class UserSerializer(serializers.ModelSerializer):
    role = RoleField()
    universe = UniverseField(required=False)
    status = StatusField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
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
