from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EducationLevelViewSet

router = DefaultRouter()
router.register(
    "education-levels",
    EducationLevelViewSet,
    basename="education-level"
)

urlpatterns = [
    path("", include(router.urls)),
]