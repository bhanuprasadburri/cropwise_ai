from django.db import models

class Crop(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)  # Cereals, Vegetables, Cash Crops, etc.
    image = models.CharField(max_length=500)
    best_season = models.CharField(max_length=50) # Kharif, Rabi, Zaid, All Seasons
    water_requirement = models.CharField(max_length=50) # High, Moderate, Low
    duration_days = models.CharField(max_length=50)
    expected_yield = models.CharField(max_length=100)
    current_price = models.FloatField(default=2000.0)
    predicted_price = models.FloatField(default=2200.0)
    price_trend_percent = models.FloatField(default=5.0)
    description = models.TextField()

    def __str__(self):
        return self.name
