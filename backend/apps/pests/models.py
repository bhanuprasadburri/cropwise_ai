from django.db import models

class Pest(models.Model):
    crop = models.CharField(max_length=100)
    pest_name = models.CharField(max_length=255)
    stage = models.CharField(max_length=100)
    severity = models.CharField(max_length=50)
    symptoms = models.JSONField(default=list)
    cultural_control = models.JSONField(default=list)
    mechanical_control = models.JSONField(default=list)
    biological_control = models.JSONField(default=list)
    chemical_control = models.JSONField(default=list)
    safety_warning = models.TextField()

    def __str__(self):
        return f"{self.crop} - {self.pest_name}"
