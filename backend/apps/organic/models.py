from django.db import models

class OrganicPractice(models.Model):
    crop = models.CharField(max_length=100)
    stage = models.CharField(max_length=100)
    practice_type = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    description = models.TextField()
    how_to_apply = models.TextField()
    frequency = models.CharField(max_length=100)
    benefits = models.TextField()
    precautions = models.TextField()

    def __str__(self):
        return f"{self.crop} - {self.title}"
