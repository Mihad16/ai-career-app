from django.db import models

class Stream(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Degree(models.Model):
    name = models.CharField(max_length=255)
    streams = models.ManyToManyField(Stream, related_name="degrees", blank=True)

    def __str__(self):
        return self.name

class Domain(models.Model):
    name = models.CharField(max_length=255)
    degree = models.ForeignKey(Degree, on_delete=models.CASCADE, related_name="domains")
    job_roles = models.CharField(max_length=255, default="Various Roles")
    average_salary = models.CharField(max_length=100, default="Varies")
    career_growth = models.CharField(max_length=100, default="High")

    def __str__(self):
        return f"{self.name} - {self.degree.name}"

class Skill(models.Model):
    name = models.CharField(max_length=255, unique=True)
    coursera_link = models.URLField(max_length=500, blank=True)
    youtube_link = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.name

class DomainSkill(models.Model):
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name="required_skills")
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="domain_requirements")
    
    class Meta:
        unique_together = ('domain', 'skill')

    def __str__(self):
        return f"{self.domain.name} requires {self.skill.name}"

class RoadmapStep(models.Model):
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name="roadmap_steps")
    step_number = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['step_number']
        unique_together = ('domain', 'step_number')

    def __str__(self):
        return f"{self.domain.name} - Step {self.step_number}: {self.title}"
