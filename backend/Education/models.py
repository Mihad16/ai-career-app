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
        

class Stream(models.Model):
    education_level = models.ForeignKey(
        EducationLevel,
        on_delete=models.CASCADE,
        related_name="streams"
    )

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Degree(models.Model):
    subject = models.ForeignKey(
        Stream,
        on_delete=models.CASCADE,
        related_name="degree"
    )

    name = models.CharField(max_length=255)
    duration = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class Subject(models.Model):
    stream = models.ForeignKey(
        Stream,
        on_delete=models.CASCADE,
        related_name="subjects"
    )

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name