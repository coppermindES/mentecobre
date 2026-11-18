from django.contrib.auth import get_user_model
from mentecobre.models import Article
from rest_framework import serializers
from users.models import RoleEnum

User = get_user_model()

def users_with_role(key):
    return User.objects.filter(role__key=key)


class ArticleSerializer(serializers.ModelSerializer):
    page_en_page_id = serializers.IntegerField(
        source="page_en.id",
        read_only=True,
    )

    page_es_page_id = serializers.IntegerField(
        source="page_es.id",
        read_only=True,
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

    type = serializers.CharField(
        source="get_type_display",
    )

    priority = serializers.CharField(
        source="get_priority_display",
    )

    status = serializers.CharField(
        source="get_status_display",
    )

    universe_name = serializers.CharField(
        source="universe.name",
        read_only=True,
    )

    translator = serializers.SlugRelatedField(
        slug_field="username",
        queryset=User.objects.all(),
        required=False,
        allow_null=True,
    )
    reviewer = serializers.SlugRelatedField(
        slug_field="username",
        queryset=User.objects.filter(role__key__in=[RoleEnum.REVIEWER.value, RoleEnum.ADMIN.value]),
        required=False,
        allow_null=True,
    )
    gregorio = serializers.SlugRelatedField(
        slug_field="username",
        queryset=User.objects.filter(role__key=RoleEnum.ADMIN.value),
        required=False,
        allow_null=True,
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
            "priority",
            "universe_name",
            # Workflow
            "status",
            # Translator
            "translator",
            "assigned_date",
            "translated_at",
            # Reviewer
            "reviewer",
            "reviewer_assigned_date",
            "reviewed_at",
            # Gregorio
            "gregorio",
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
