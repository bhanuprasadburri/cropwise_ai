from django.db import models
from django.contrib.auth.models import User

class Farm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='farms')
    farm_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=100, default='Andhra Pradesh')
    district = models.CharField(max_length=100, default='Palnadu')
    village = models.CharField(max_length=100, blank=True, null=True)
    area = models.FloatField(default=5.0)
    area_unit = models.CharField(max_length=20, default='Acres')
    soil_type = models.CharField(max_length=100, default='Clay Loam')
    soil_ph = models.FloatField(default=6.8)
    irrigation_type = models.CharField(max_length=100, default='Borewell / Tube Well')
    current_crop = models.CharField(max_length=100, default='Paddy')
    sowing_date = models.DateField(null=True, blank=True)
    health_score = models.IntegerField(default=84)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.farm_name} ({self.area} {self.area_unit}) - {self.user.email}"
