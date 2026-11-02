from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True, null=True)
    state = models.CharField(max_length=100, default='Andhra Pradesh')
    district = models.CharField(max_length=100, default='Palnadu')
    village = models.CharField(max_length=100, blank=True, null=True)
    preferred_language = models.CharField(max_length=50, default='Telugu / English')
    farm_size = models.CharField(max_length=50, default='5 Acres')
    primary_crop = models.CharField(max_length=100, default='Paddy & Tomato')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} ({self.user.email})"
