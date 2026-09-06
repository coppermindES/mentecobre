from coppermind.models import Page, Wiki
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel


class Article(TimeStampedModel):
    class Type(models.TextChoices):
        CULTURE = "CU", _("Cultura")
        EVENT = "EVT", _("Eventos y eras")
        LIFEFORM = "FDV", _("Formas de vida")
        BOOKS = "LIB", _("Libros")
        PLACES = "LOC", _("Localizaciones")
        MAGIC = "MG", _("Magia")
        CHARACTERS = "PJ", _("Personajes")
        OBJECTS = "OBJ", _("Objetos y materiales")
        GROUPS = "ORG", _("Organización")
        FAMILY = "FAM", _("Familia")
        MULTIMEDIA = "MUL", _("Multimedia")
        WIKI = "WIKI", _("Wiki/otros")
        DISAMBIG = "DIS", _("Disambiguación")
        REDIRECT = "RD", _("Redirección")
        SUBPAGE = "SUB", _("Subpágina")

    class Priority(models.IntegerChoices):
        HIGH = 1, _("Alta")
        MEDIUM = 2, _("Media")
        LOW = 3, _("Baja")
        SUBPAGES = 4, _("Subpáginas")
        SIRAYA = 5, _("Siraya")
        TBD = 99, _("TBD")

    class Status(models.TextChoices):
        UNTRANSLATED = "untranslated", _("Sin traducir")
        TRANSLATING = "translating", _("Traduciendo")
        TRANSLATED = "translated", _("Traducido")
        REVIEWING = "reviewing", _("Revisando")
        REVIEWED = "reviewed", _("Revisado")
        GREGORING = "gregoring", _("Engregoriando")
        GREGORIADO = "gregorio", _("Engregoriado")

    page_en = models.OneToOneField(
        Page,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="article_en",
        limit_choices_to={"wiki": Wiki.EN, "ns": 0},
        verbose_name="Página EN",
    )
    page_es = models.OneToOneField(
        Page,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="article_es",
        limit_choices_to={"wiki": Wiki.ES, "ns": 0},
        verbose_name="Página ES",
    )

    type = models.CharField(
        max_length=4,
        choices=Type,
        null=True,
        blank=True,
        verbose_name="Tipo de artículo",
    )
    priority = models.IntegerField(
        choices=Priority,
        null=True,
        blank=True,
        verbose_name="Prioridad",
    )
    universe = models.ForeignKey(
        "universe.Universe",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        related_name="articles",
        verbose_name="Universo",
    )
    status = models.CharField(
        max_length=16,
        choices=Status,
        default=Status.UNTRANSLATED,
        db_index=True,
        verbose_name="Estado",
    )
    translator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        related_name="translations",
        limit_choices_to={"groups__name": "Translators"},
        verbose_name="Traductor",
    )
    assigned_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha asignación traductor",
    )
    translated_at = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha traducido",
    )
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        related_name="reviews",
        limit_choices_to={"groups__name": "Reviewers"},
        verbose_name="Revisor",
    )
    reviewer_assigned_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha asignación revisor",
    )
    reviewed_at = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha revisado",
    )
    gregorio = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True,
        related_name="engregoriados",
        limit_choices_to={"groups__name": "Admins"},
        verbose_name="Gregorio",
    )
    gregorio_assigned_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha asignación gregorio",
    )
    gregorio_at = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha engregoriado",
    )
    notes = models.TextField(
        null=True,
        blank=True,
        verbose_name="Notas",
    )
    url_drive = models.URLField(
        null=True,
        blank=True,
        verbose_name="URL Drive",
    )
    linked_copper_en = models.BooleanField(
        default=False,
        verbose_name="Enlazada en la Coppermind EN",
    )
    problem_copper = models.TextField(
        null=True,
        blank=True,
        verbose_name="Problemas de la Copper",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Artículo"
        verbose_name_plural = "Artículos"
        constraints = [
            models.CheckConstraint(
                condition=(models.Q(page_en__isnull=False) | models.Q(page_es__isnull=False)),
                name="article_must_have_at_least_one_page",
            )
        ]

    def __str__(self):
        en = self.page_en.title if self.page_en else "—"
        es = self.page_es.title if self.page_es else "—"
        return f"{en} ↔ {es} [{self.get_status_display()}]"

    ALLOWED_TRANSITIONS = {
        Status.UNTRANSLATED: {Status.TRANSLATING},
        Status.TRANSLATING: {Status.TRANSLATED, Status.UNTRANSLATED},
        Status.TRANSLATED: {Status.REVIEWING, Status.TRANSLATING},
        Status.REVIEWING: {Status.REVIEWED, Status.TRANSLATED},
        Status.REVIEWED: {Status.REVIEWING},
        Status.GREGORING: {Status.REVIEWED, Status.GREGORING},
        Status.GREGORIADO: {Status.GREGORING},
    }

    def can_transition_to(self, new_status: str) -> bool:
        return new_status in self.ALLOWED_TRANSITIONS.get(self.status, set())

    def transition_to(self, new_status: str, save: bool = True) -> None:
        """
        Apply a change in status and update the dates related.
        Raises a ValueError if translation is not allowed
        """
        from django.utils import timezone

        if not self.can_transition_to(new_status):
            raise ValueError(
                _("Transición no permitida: {old_status} → {new_status}").format(
                    old_status=self.status, new_status=new_status
                )
            )

        today = timezone.now().date()
        self.status = new_status

        if new_status == self.Status.TRANSLATING:
            self.assigned_date = today
        elif new_status == self.Status.TRANSLATED:
            self.translated_at = today
        elif new_status == self.Status.REVIEWING:
            self.reviewer_assigned_date = today
        elif new_status == self.Status.REVIEWED:
            self.reviewed_at = today

        if save:
            self.save()
