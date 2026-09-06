# Custom Exceptions
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.exceptions import APIException


class TooEarly(APIException):
    status_code = status.HTTP_425_TOO_EARLY
    default_detail = _("Demasiado pronto")
    default_code = "too_early"
