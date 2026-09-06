from coppermind.models import Page, Wiki
from mentecobre.models import Article
from rest_framework import serializers


class ArticleSerializer(serializers.ModelSerializer):
    page_en_page_id = serializers.SlugRelatedField(
        source="page_en",
        slug_field="page_id",
        queryset=Page.objects.filter(wiki=Wiki.EN),
        required=False,
        allow_null=True,
    )

    page_es_page_id = serializers.SlugRelatedField(
        source="page_es",
        slug_field="page_id",
        queryset=Page.objects.filter(wiki=Wiki.ES),
        required=False,
        allow_null=True,
    )

    page_en_title = serializers.CharField(
        source="page_en.title",
        read_only=True,
    )
    page_es_title = serializers.CharField(
        source="page_es.title",
        read_only=True,
    )
    page_en_url = serializers.URLField(
        source="page_en.fullurl",
        read_only=True,
    )
    page_es_url = serializers.URLField(
        source="page_es.fullurl",
        read_only=True,
    )

    type_display = serializers.CharField(
        source="get_type_display",
        read_only=True,
    )

    priority_display = serializers.CharField(
        source="get_priority_display",
        read_only=True,
    )

    status_display = serializers.CharField(
        source="get_status_display",
        read_only=True,
    )

    universe_name = serializers.CharField(
        source="universe.name",
        read_only=True,
    )

    translator_username = serializers.CharField(
        source="translator.username",
        read_only=True,
    )

    reviewer_username = serializers.CharField(
        source="reviewer.username",
        read_only=True,
    )

    gregorio_username = serializers.CharField(
        source="gregorio.username",
        read_only=True,
    )

    class Meta:
        model = Article

        fields = [
            "id",
            # EN page
            "page_en_page_id",
            "page_en_title",
            "page_en_url",
            # ES page
            "page_es_page_id",
            "page_es_title",
            "page_es_url",
            # Classification
            "type",
            "type_display",
            "priority",
            "priority_display",
            "universe",
            "universe_name",
            # Workflow
            "status",
            "status_display",
            # Translator
            "translator",
            "translator_username",
            "assigned_date",
            "translated_at",
            # Reviewer
            "reviewer",
            "reviewer_username",
            "reviewer_assigned_date",
            "reviewed_at",
            # Gregorio
            "gregorio",
            "gregorio_username",
            "gregorio_assigned_date",
            "gregorio_at",
            # metadata
            "notes",
            "url_drive",
            "linked_copper_en",
            "problem_copper",
            # Timestamps
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "created_at",
            "updated_at",
        ]

    def validate_status(self, attrs):
        """
        Validate status transitions.
        """

        if not self.instance:
            return attrs

        new_status = attrs.get("status")

        if (
            new_status
            and new_status != self.instance.status
            and not self.instance.can_transition_to(new_status)
        ):
            raise serializers.ValidationError(
                {"status": (f"Invalid transition: {self.instance.status} → {new_status}")}
            )

        return attrs

    def update(self, instance, validated_data):
        """
        Apply transition logic automatically.
        """

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance
