from rest_framework import viewsets
from .models import EducationLevel
from .serializers import EducationLevelSerializer

class EducationLevelViewSet(viewsets.ModelViewSet):
    queryset = EducationLevel.objects.all()
    serializer_class = EducationLevelSerializer