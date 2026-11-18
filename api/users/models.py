from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from universe.models import Universe


class UserStatus(models.TextChoices):
    ACTIVE = "activo", "Activo"
    REST = "descanso", "Descanso"
    INACTIVE = "baja", "Baja"

class RoleEnum(models.TextChoices):
    TRANSLATOR = "translator", "Traductor"
    REVIEWER = "reviewer", "Revisor"
    ADMIN = "admin", "Administrador"


class Role(models.Model):
    key = models.CharField(max_length=32, unique=True, choices=RoleEnum.choices)

    @property
    def name(self):
        return self.get_key_display()

    def __str__(self):
        return self.name

class User(AbstractUser):
    role = models.ForeignKey(
        Role,
        on_delete=models.SET_NULL,
        related_name="users",
        null=True,
        blank=True,
    )
    universe = models.ManyToManyField(
        Universe,
        related_name="user_universe",
        blank=True,
    )
    copper_username = models.CharField(max_length=500, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=UserStatus.choices,
        default=UserStatus.ACTIVE,
    )

    @property
    def status_changed_at(self):
        latest_log = self.status_logs.filter(status=self.status).order_by("-changed_at").first()
        return latest_log.changed_at if latest_log else None

    def __str__(self):
        return self.username


class UserStatusLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="status_logs",
    )
    status = models.CharField(max_length=10, choices=UserStatus.choices)
    changed_at = models.DateTimeField(auto_now_add=True)
    changed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="user_status_changes_made",
        null=True,
        blank=True,
    )
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user} - {self.status}"
