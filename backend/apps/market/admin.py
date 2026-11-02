from django.contrib import admin
from .models import MarketPrice

@admin.register(MarketPrice)
class MarketPriceAdmin(admin.ModelAdmin):
    list_display = ('crop', 'market', 'state', 'district', 'modal_price', 'date')
    search_fields = ('crop', 'market', 'district')
    list_filter = ('crop', 'state', 'district', 'date')
