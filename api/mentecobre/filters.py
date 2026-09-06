from django_filters import BooleanFilter, CharFilter, DateFilter, FilterSet, MultipleChoiceFilter
from mentecobre.models import Article
from universe.models import Universe
from users.models import User


class ArticleFilter(FilterSet):
    """
    Filtros personalizados para Article usando django-filter.

    Examples:
      GET /api/articles/?status=translating
      GET /api/articles/?type=PJ
      GET /api/articles/?priority=1
      GET /api/articles/?translator=5
      GET /api/articles/?universe=2
      GET /api/articles/?engregoriado=true
      GET /api/articles/?linked_copper_en=false
      GET /api/articles/?status__in=translating,reviewing
    """

    status = MultipleChoiceFilter(choices=Article.Status.choices)
    type = MultipleChoiceFilter(choices=Article.Type.choices)
    priority = MultipleChoiceFilter(choices=Article.Priority.choices)

    translator = MultipleChoiceFilter(field_name="translator__id", choices=User.objects.all())
    reviewer = MultipleChoiceFilter(field_name="reviewer__id", choices=User.objects.all())
    gregorio = MultipleChoiceFilter(field_name="gregorio__id", choices=User.objects.all())
    universe = MultipleChoiceFilter(field_name="universe__id", choices=Universe.objects.all())

    # Yes or No filters
    linked_copper_en = BooleanFilter()

    # Title search(case-insensitive)
    title_en = CharFilter(field_name="page_en__title", lookup_expr="icontains")
    title_es = CharFilter(field_name="page_es__title", lookup_expr="icontains")

    # Dates
    assigned_date_after = DateFilter(field_name="assigned_date", lookup_expr="gte")
    assigned_date_before = DateFilter(field_name="assigned_date", lookup_expr="lte")
    translated_at_after = DateFilter(field_name="translated_at", lookup_expr="gte")
    translated_at_before = DateFilter(field_name="translated_at", lookup_expr="lte")
    reviewed_at_after = DateFilter(field_name="reviewed_at", lookup_expr="gte")
    reviewed_at_before = DateFilter(field_name="reviewed_at", lookup_expr="lte")

    class Meta:
        model = Article
        fields = {
            "status": ["exact", "in"],
            "type": ["exact", "in"],
            "priority": ["exact", "in"],
            "translator": ["exact", "in"],
            "reviewer": ["exact", "in"],
            "gregorio": ["exact", "in"],
            "universe": ["exact", "in"],
            "linked_copper_en": ["exact"],
        }
