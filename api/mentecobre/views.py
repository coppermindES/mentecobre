from common.permissions import IsAdmin, IsReviewerOrAdmin, IsTranslatorOrAbove
from mentecobre.filters import ArticleFilter
from mentecobre.manager import ArticleManager
from mentecobre.models import Article
from mentecobre.serializers import ArticleSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from users.models import RoleEnum

TRANSLATOR_WRITABLE_FIELDS = {
    "assigned_date",
    "translator",
    "translated_at",
    "notes",
    "status",
}


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.select_related(
        "page_en",
        "page_es",
        "translator",
        "reviewer",
        "gregorio",
        "universe",
    ).all()

    serializer_class = ArticleSerializer
    filterset_class = ArticleFilter

    ordering_fields = [
        "status",
        "type",
        "priority",
        "assigned_date",
        "translated_at",
        "reviewed_at",
        "created_at",
        "updated_at",
    ]
    ordering = ["page_en__title", "priority", "type"]

    search_fields = [
        "page_en__title",
        "page_es__title",
    ]

    permission_classes = [IsTranslatorOrAbove]

    def get_permissions(self):
        if self.action in {
            "assign_reviewer",
            "mark_reviewed",
            "next_to_review",
            "destroy",
            "create",
        }:
            return [IsReviewerOrAdmin()]

        if self.action in {
            "assign_gregorio",
            "mark_engregoriado",
            "next_to_gregorio",
        }:
            return [IsAdmin()]

        return super().get_permissions()

    def get_serializer(self, *args, **kwargs):
        user = self.request.user
        user_role = user.role.key if user.is_authenticated and user.role_id else None

        serializer = super().get_serializer(*args, **kwargs)
        update_actions = {"update", "partial_update"}
        is_translator_update = (
            self.action in update_actions
            and user_role == RoleEnum.TRANSLATOR.value
            and hasattr(serializer, "initial_data")
        )
        if is_translator_update:
            sent = set(serializer.initial_data or {})
            forbidden = sent - set(TRANSLATOR_WRITABLE_FIELDS)
            if forbidden:
                raise ValidationError(
                    f"Tu rol no puede actualizar los campos {', '.join(forbidden)}"
                )

        return serializer

    MANAGER = ArticleManager

    @action(detail=True, methods=["post"], url_path="assign_translator")
    def assign_translator(self, request, pk=None):

        article = self.get_object()
        user = request.user

        manager = self.MANAGER()
        manager.assign_translator(user, article.id)

        return Response(
            "El artículo ha sido asignado para traducir con éxito",
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="mark_translated")
    def mark_translated(self, request, pk=None):
        article = self.get_object()
        user = request.user
        manager = self.MANAGER()
        manager.set_as_translated(user, article.id)

        return Response(
            "El artículo ha sido marcado como traducido",
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="assign_reviewer")
    def assign_reviewer(self, request, pk=None):
        article = self.get_object()
        user = request.user

        manager = self.MANAGER()
        manager.assign_reviewer(user, article.id)

        return Response(
            "El artículo ha sido asignado para revisar con éxito",
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="mark_reviewed")
    def mark_reviewed(self, request, pk=None):
        article = self.get_object()
        user = request.user
        manager = self.MANAGER()
        manager.set_as_reviewed(user, article.id)

        return Response(
            "El artículo ha sido marcado como revisado",
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="assign_gregorio")
    def assign_gregorio(self, request, pk=None):
        article = self.get_object()
        user = request.user

        manager = self.MANAGER()
        manager.assign_gregorio(user, article.id)

        return Response(
            "El artículo ha sido asignado para gregorio con éxito",
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="mark_gregorio")
    def mark_engregoriado(self, request, pk=None):
        article = self.get_object()
        user = request.user
        manager = self.MANAGER()
        manager.set_as_engregoriado(user, article.id)

        return Response(
            "El artículo ha sido marcado como engregoriado",
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"], url_path="next_to_translate")
    def next_to_translate(self, request):
        user = request.user

        manager = self.MANAGER()
        result = manager.next_to_translate(user)

        return Response(result)

    @action(detail=False, methods=["get"], url_path="next_to_review")
    def next_to_review(self, request):
        user = request.user

        manager = self.MANAGER()
        result = manager.next_to_review(user)

        return Response(result)

    @action(detail=False, methods=["get"], url_path="next_to_gregorio")
    def next_to_gregorio(self, request):
        user = request.user

        manager = self.MANAGER()
        result = manager.next_to_engregoriate(user)

        return Response(result)
