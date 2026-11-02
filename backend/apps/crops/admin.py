from django.contrib import admin
from .models import Crop

@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'best_season', 'water_requirement', 'current_price', 'predicted_price')
    search_fields = ('name', 'category', 'best_season')
    list_filter = ('category', 'best_season', 'water_requirement')
