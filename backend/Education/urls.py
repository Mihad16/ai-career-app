from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    EducationLevelViewSet,
    StreamViewSet,
)

router = DefaultRouter()

router.register(
    r"education-levels",
    EducationLevelViewSet,
    basename="education-level"
)

router.register(
    r"streams",
    StreamViewSet,
    basename="stream"
)

urlpatterns = [
    path("", include(router.urls)),
]