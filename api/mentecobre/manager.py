from django.db import transaction
from django.utils import timezone
from mentecobre.models import Article
from rest_framework.exceptions import ValidationError


class ArticleManager:
    @staticmethod
    def _assign_role(
        *,
        article_id,
        user,
        role_field,
        current_status,
        next_status,
        date_field,
        already_assigned_message,
        unavailable_message,
    ):

        with transaction.atomic():
            article = Article.objects.select_for_update().get(pk=article_id)

            if Article.objects.filter(
                **{role_field: user},
                status=next_status,
            ).exists():
                raise ValidationError("Ya tienes un artículo en progreso.")

            if article.status != current_status:
                raise ValidationError(unavailable_message)

            if getattr(article, role_field) is not None:
                raise ValidationError(already_assigned_message)

            setattr(article, role_field, user)

            article.transition_to(
                next_status,
                save=False,
            )

            setattr(
                article,
                date_field,
                timezone.now(),
            )

            article.save()

            return article

    @classmethod
    def assign_translator(cls, user, article_id):

        return cls._assign_role(
            article_id=article_id,
            user=user,
            role_field="translator",
            current_status=Article.Status.UNTRANSLATED,
            next_status=Article.Status.TRANSLATING,
            date_field="assigned_date",
            already_assigned_message=("El artículo ya tiene traductor."),
            unavailable_message=("El artículo ya no está disponible."),
        )

    @classmethod
    def assign_reviewer(cls, user, article_id):

        return cls._assign_role(
            article_id=article_id,
            user=user,
            role_field="reviewer",
            current_status=Article.Status.TRANSLATED,
            next_status=Article.Status.REVIEWING,
            date_field="reviewer_assigned_date",
            already_assigned_message=("El artículo ya tiene revisor."),
            unavailable_message=("El artículo no está listo para revisión."),
        )

    @classmethod
    def assign_gregorio(cls, user, article_id):

        return cls._assign_role(
            article_id=article_id,
            user=user,
            role_field="gregorio",
            current_status=Article.Status.REVIEWED,
            next_status=Article.Status.GREGORING,
            date_field="gregorio_assigned_date",
            already_assigned_message=("El artículo ya tiene gregorio."),
            unavailable_message=("El artículo no está listo para Gregorio."),
        )

    @staticmethod
    def _set_new_status(
        *,
        article_id,
        user,
        role_field,
        current_status,
        next_status,
        date_field,
        not_assigned_message,
        unavailable_message,
    ):

        with transaction.atomic():
            article = Article.objects.select_for_update().get(pk=article_id)

            if article.status != current_status:
                raise ValidationError(unavailable_message)

            if getattr(article, role_field) != user:
                raise ValidationError(not_assigned_message)

            article.transition_to(
                next_status,
                save=False,
            )

            setattr(
                article,
                date_field,
                timezone.now(),
            )

            article.save()

            return article

    @classmethod
    def set_as_translated(cls, user, article_id):

        return cls._set_new_status(
            article_id=article_id,
            user=user,
            role_field="translator",
            current_status=Article.Status.TRANSLATING,
            next_status=Article.Status.TRANSLATED,
            date_field="translated_at",
            not_assigned_message=("Este artículo no está asignado a ti como traductor."),
            unavailable_message=("El artículo no está en estado 'Traduciendo'"),
        )

    @classmethod
    def set_as_reviewed(cls, user, article_id):

        return cls._set_new_status(
            article_id=article_id,
            user=user,
            role_field="reviewer",
            current_status=Article.Status.REVIEWING,
            next_status=Article.Status.REVIEWED,
            date_field="reviewed_at",
            not_assigned_message=("Este artículo no está asignado a ti como revisor."),
            unavailable_message=("El artículo no está en estado 'Revisando'"),
        )

    @classmethod
    def set_as_engregoriado(cls, user, article_id):

        return cls._set_new_status(
            article_id=article_id,
            user=user,
            role_field="gregorio",
            current_status=Article.Status.GREGORING,
            next_status=Article.Status.GREGORIADO,
            date_field="gregorio_at",
            not_assigned_message=("Este artículo no está asignado a ti como revisor."),
            unavailable_message=("El artículo no está en estado 'Enregoriando'"),
        )

    @staticmethod
    def _next_to_action(user, status):
        user_universes = user.universes.all()
        result = []
        with transaction.atomic():
            for universe in user_universes:
                article = (
                    Article.objects.filter(
                        status=status,
                        universe=universe,
                    )
                    .order_by("priority", "type", "page_en__title")
                    .first()
                )

                if article:
                    result.append(
                        {
                            "universe_id": universe.id,
                            "universe_name": universe.name,
                            "title_en": article.page_en.title,
                            "title_es": article.page_es.title,
                            "url_en": article.page_en.full_url,
                            "url_es": article.page_es.full_url,
                        }
                    )

            return result

    @classmethod
    def next_to_translate(cls, user):
        return cls._next_to_action(user, Article.Status.UNTRANSLATED)

    @classmethod
    def next_to_review(cls, user):
        return cls._next_to_action(user, Article.Status.TRANSLATED)

    @classmethod
    def next_to_engregoriate(cls, user):
        return cls._next_to_action(user, Article.Status.REVIEWED)
