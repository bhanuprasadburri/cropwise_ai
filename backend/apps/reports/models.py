from django.db import models
from django.contrib.auth.models import User

class SavedReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_reports')
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=100) # Disease Detection, Crop Recommendation, etc.
    date = models.CharField(max_length=50)
    farm_name = models.CharField(max_length=255)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.user.email}"
