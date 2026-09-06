from common.permissions import CanEditAdmin
from coppermind.manager import CoppermindManager
from coppermind.models import Page
from coppermind.serializers import PageSerializer, UpdatePagesSerializer
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class CoppermindViewSet(ModelViewSet):
    MANAGER = CoppermindManager()

    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [CanEditAdmin]

    @extend_schema(request=UpdatePagesSerializer, responses={200: "Éxito"}, summary="Lanza la actualización de páginas")
    @action(detail=False, methods=["post"], url_path="update_pages")
    def update_pages(self, request):
        language = request.data["language"]
        namespaces = request.data["namespaces"]

        if not language:
            raise ValueError("No hay idioma seleccionado")

        manager = self.MANAGER
        result = manager.update_pages(language, namespaces)

        # if result["result"] == "error":
        #     # Managed error: other thread is updating pages
        #     raise TooEarly(result["message"])

        return Response(result, status=status.HTTP_200_OK)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="thread_id",
                type=str,
                location=OpenApiParameter.QUERY,
                required=True,
                description="ID del hilo de actualización",
            )
        ],
        responses={200: dict},
        summary="Consulta el estado de un hilo de actualización",
    )
    @action(
        detail=False,
        methods=["get"],
        url_path="update_pages/status",
    )
    def update_pages_status(self, request):
        thread_id = request.query_params.get("thread_id")
        manager = self.MANAGER

        thread_status = manager.get_thread_status_from_cache(thread_id)

        if thread_status:
            return Response({"status": thread_status}, status=200)
        else:
            raise NotFound("Ese hilo no se ha encontrado")
