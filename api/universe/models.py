from django.db import models
from django.db.models.functions import Lower


# Create your models here.
class Universe(models.Model):
    universe = models.CharField(
        max_length=50, null=False, blank=False, verbose_name="universo", unique=True
    )

    def __str__(self):
        return str(self.universe)

    class Meta:
        verbose_name = "Universo"
        verbose_name_plural = "Universos"

        constraints = [
            models.UniqueConstraint(
                Lower("universe"),
                name="universe_unique",
            ),
        ]
