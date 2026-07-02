from rest_framework import serializers
from .models import EducationLevel ,Stream , Degree, Subject

class EducationLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationLevel
        fields = "__all__"


class StreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = "__all__"


class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = "__all__"
    

class SubjectSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Subject
        fields = "__all__"