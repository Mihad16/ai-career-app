from django.contrib import admin
from .models import EducationLevel, Stream , Degree ,Subject

admin.site.register(EducationLevel)
admin.site.register(Stream)
admin.site.register(Degree)
admin.site.register(Subject)