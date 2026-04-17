from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from universe.models import Universe


class UserStatus(models.TextChoices):
    ACTIVE = "activo", "Activo"
    REST = "descanso", "Descanso"
    INACTIVE = "inactivo", "Inactivo"


class User(AbstractUser):
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
