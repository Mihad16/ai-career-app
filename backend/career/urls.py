from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'streams', views.StreamViewSet, basename='stream')
router.register(r'degrees', views.DegreeViewSet, basename='degree')
router.register(r'domains', views.DomainViewSet, basename='domain')
router.register(r'skills', views.SkillViewSet, basename='skill')

urlpatterns = [
    path('', include(router.urls)),
    path('domains/<int:domain_id>/details/', views.domain_details, name='domain-details'),
    path('evaluate/', views.evaluate_career, name='evaluate-career'),
    path('recommend/', views.recommend_career, name='recommend-career'),
]