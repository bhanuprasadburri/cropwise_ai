from django.db import models
from django.contrib.auth.models import User
from apps.farms.models import Farm

class DiseasePrediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='disease_predictions')
    farm = models.ForeignKey(Farm, on_delete=models.SET_NULL, null=True, blank=True, related_name='disease_predictions')
    image = models.ImageField(upload_to='disease_predictions/')
    crop = models.CharField(max_length=100)
    disease = models.CharField(max_length=255)
    confidence = models.FloatField()
    severity = models.CharField(max_length=50, default='Moderate')
    model_version = models.CharField(max_length=50, default='MobileNetV2-Agri-v2.4')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.crop} - {self.disease} ({self.confidence}%)"
