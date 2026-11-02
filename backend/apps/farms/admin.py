from django.contrib import admin
from .models import Farm

@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = ('farm_name', 'user', 'location', 'area', 'soil_type', 'current_crop', 'health_score')
    search_fields = ('farm_name', 'user__email', 'location', 'current_crop')
    list_filter = ('soil_type', 'state', 'district')
