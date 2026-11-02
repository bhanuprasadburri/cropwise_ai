from django.contrib import admin
from .models import Pest

@admin.register(Pest)
class PestAdmin(admin.ModelAdmin):
    list_display = ('pest_name', 'crop', 'stage', 'severity')
    search_fields = ('pest_name', 'crop')
    list_filter = ('crop', 'severity')
