from rest_framework import serializers
from .models import Farm

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = [
            'id', 'farm_name', 'location', 'state', 'district', 'village',
            'area', 'area_unit', 'soil_type', 'soil_ph', 'irrigation_type',
            'current_crop', 'sowing_date', 'health_score', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
