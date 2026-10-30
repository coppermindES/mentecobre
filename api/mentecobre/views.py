from mentecobre.filters import ArticleFilter
from mentecobre.manager import ArticleManager
from mentecobre.models import Article
from mentecobre.serializers import ArticleSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


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
