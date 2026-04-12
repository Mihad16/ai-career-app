from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Stream, Degree, Domain, Skill, RoadmapStep
from .serializers import StreamSerializer, DegreeSerializer, DomainSerializer, SkillSerializer, RoadmapStepSerializer

class StreamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer

class DegreeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Degree.objects.all()
    serializer_class = DegreeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        stream_id = self.request.query_params.get('stream_id')
        if stream_id:
            queryset = queryset.filter(streams__id=stream_id)
        return queryset

class DomainViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        degree_id = self.request.query_params.get('degree_id')
        if degree_id:
            queryset = queryset.filter(degree_id=degree_id)
        return queryset

@api_view(['GET'])
def domain_details(request, domain_id):
    domain = get_object_or_404(Domain, pk=domain_id)
    
    # Required skills for this domain (Topics to Study)
    domain_skills = domain.required_skills.select_related('skill')
    topics = [{"id": ds.skill.id, "name": ds.skill.name} for ds in domain_skills]
        
    # Roadmap Steps
    steps = RoadmapStep.objects.filter(domain=domain).order_by('step_number')
    roadmap_serializer = RoadmapStepSerializer(steps, many=True)
    
    return Response({
        "domain": domain.name,
        "topics": topics,
        "roadmap": roadmap_serializer.data
    })

@api_view(['POST'])
def evaluate_career(request):
    domain_id = request.data.get('domain_id')
    user_skill_ids = set(request.data.get('user_skills', []))
    
    domain = get_object_or_404(Domain, pk=domain_id)
    domain_skills = domain.required_skills.select_related('skill')
    
    career_skills = {ds.skill.id: ds.skill for ds in domain_skills}
    career_skill_ids = set(career_skills.keys())
    
    missing_skill_ids = career_skill_ids - user_skill_ids
    missing_skills = [{
        "id": sid, 
        "name": career_skills[sid].name,
        "coursera_link": career_skills[sid].coursera_link,
        "youtube_link": career_skills[sid].youtube_link,
    } for sid in missing_skill_ids]
    
    if not career_skill_ids:
        readiness = 100
    else:
        matched_count = len(career_skill_ids.intersection(user_skill_ids))
        readiness = int((matched_count / len(career_skill_ids)) * 100)
        
    steps = RoadmapStep.objects.filter(domain=domain).order_by('step_number')
    roadmap_serializer = RoadmapStepSerializer(steps, many=True)
    
    return Response({
        "domain": domain.name,
        "job_roles": domain.job_roles,
        "average_salary": domain.average_salary,
        "career_growth": domain.career_growth,
        "missing_skills": missing_skills,
        "readiness": readiness,
        "roadmap": roadmap_serializer.data
    })