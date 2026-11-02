from django.contrib import admin
from .models import SavedReport

@admin.register(SavedReport)
class SavedReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'type', 'farm_name', 'created_at')
    search_fields = ('title', 'user__email', 'farm_name')
    list_filter = ('type',)
