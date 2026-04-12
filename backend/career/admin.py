from django.contrib import admin
from .models import Stream, Degree, Domain, Skill, DomainSkill, RoadmapStep

@admin.register(Stream)
class StreamAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Degree)
class DegreeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ('name', 'degree')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(DomainSkill)
class DomainSkillAdmin(admin.ModelAdmin):
    list_display = ('domain', 'skill')

@admin.register(RoadmapStep)
class RoadmapStepAdmin(admin.ModelAdmin):
    list_display = ('domain', 'step_number', 'title')
