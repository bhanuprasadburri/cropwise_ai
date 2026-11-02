from django.db import models

class WeatherCache(models.Model):
    location = models.CharField(max_length=255)
    temp = models.FloatField()
    condition = models.CharField(max_length=100)
    humidity = models.IntegerField()
    rainfall = models.FloatField()
    wind_speed = models.FloatField()
    soil_moisture = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.location} - {self.temp}°C"
