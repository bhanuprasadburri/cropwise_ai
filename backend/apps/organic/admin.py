from django.contrib import admin
from .models import OrganicPractice

@admin.register(OrganicPractice)
class OrganicPracticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'crop', 'stage', 'practice_type', 'frequency')
    search_fields = ('title', 'crop', 'description')
    list_filter = ('crop', 'practice_type')
