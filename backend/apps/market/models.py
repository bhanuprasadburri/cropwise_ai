from django.db import models

class MarketPrice(models.Model):
    crop = models.CharField(max_length=100)
    state = models.CharField(max_length=100, default='Andhra Pradesh')
    district = models.CharField(max_length=100, default='Palnadu')
    market = models.CharField(max_length=255)
    date = models.DateField()
    min_price = models.FloatField()
    max_price = models.FloatField()
    modal_price = models.FloatField()
    arrival_quantity = models.FloatField(default=1000.0)
    source = models.CharField(max_length=100, default='Agmarknet APMC')

    def __str__(self):
        return f"{self.crop} ({self.market}) - ₹{self.modal_price}/qtl on {self.date}"
