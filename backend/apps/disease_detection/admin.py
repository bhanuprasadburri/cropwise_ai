from django.contrib import admin
from .models import DiseasePrediction

@admin.register(DiseasePrediction)
class DiseasePredictionAdmin(admin.ModelAdmin):
    list_display = ('crop', 'disease', 'user', 'confidence', 'severity', 'created_at')
    search_fields = ('crop', 'disease', 'user__email')
    list_filter = ('severity', 'crop')
