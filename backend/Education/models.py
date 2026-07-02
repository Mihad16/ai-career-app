from django.db import models

class EducationLevel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Education Level"
        verbose_name_plural = "Education Levels"

    def __str__(self):
        return self.name