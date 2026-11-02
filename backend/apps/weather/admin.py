from django.contrib import admin
from .models import WeatherCache

@admin.register(WeatherCache)
class WeatherCacheAdmin(admin.ModelAdmin):
    list_display = ('location', 'temp', 'condition', 'humidity', 'rainfall', 'updated_at')
    search_fields = ('location', 'condition')
