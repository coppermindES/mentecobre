from django.db import models


class Wiki(models.TextChoices):
    EN = "en", "Coppermind (EN)"
    ES = "es", "Coppermind (ES)"


class Page(models.Model):
    wiki = models.CharField(
        max_length=2,
        choices=Wiki.choices,
        db_index=True,
        verbose_name="Wiki",
    )
    page_id = models.PositiveIntegerField(
        verbose_name="Page ID",
        help_text="ID de página en MediaWiki",
    )
    ns = models.IntegerField(
        verbose_name="Namespace",
    )
    title = models.CharField(
        max_length=512,
        verbose_name="Título",
    )
    touched = models.DateTimeField(
        verbose_name="Última modificación",
        help_text="Campo 'touched' de la API de MediaWiki",
    )
    fullurl = models.URLField(
        max_length=1024,
        verbose_name="URL completa",
    )
    editurl = models.URLField(
        max_length=1024,
        verbose_name="URL de edición",
    )
    synced_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Última sincronización",
    )

    class Meta:
        indexes = [
            models.Index(fields=["wiki", "ns"]),
            models.Index(fields=["wiki", "title"]),
        ]
        ordering = ["wiki", "ns", "title"]
        verbose_name = "Página"
        verbose_name_plural = "Páginas"
        constraints = [
            models.UniqueConstraint(
                fields=["wiki", "page_id"],
                name="unique_page_per_wiki",
            )
        ]

    def __str__(self):
        return f"[{self.wiki}] {self.title} (ns={self.ns})"
