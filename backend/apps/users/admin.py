from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'user', 'phone', 'state', 'district', 'farm_size', 'created_at')
    search_fields = ('full_name', 'user__email', 'phone', 'state', 'district')
