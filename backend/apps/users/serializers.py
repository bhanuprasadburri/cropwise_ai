from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserRegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, min_length=6)
    state = serializers.CharField(default='Andhra Pradesh')
    district = serializers.CharField(default='Palnadu')
    village = serializers.CharField(required=False, allow_blank=True)
    preferred_language = serializers.CharField(default='Telugu / English')
    farm_size = serializers.CharField(required=False, default='5 Acres')
    primary_crop = serializers.CharField(required=False, default='Paddy & Tomato')

    def validate_email(self, value):
        email_str = value.strip().lower()
        if not email_str.endswith('@gmail.com'):
            raise serializers.ValidationError("Only valid @gmail.com email addresses are allowed.")
        if User.objects.filter(username=email_str).exists() or User.objects.filter(email=email_str).exists():
            raise serializers.ValidationError("A user with this @gmail.com address already exists in database.")
        return email_str

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['name']
        )
        Profile.objects.create(
            user=user,
            full_name=validated_data['name'],
            phone=validated_data.get('phone', ''),
            state=validated_data.get('state', 'Andhra Pradesh'),
            district=validated_data.get('district', 'Palnadu'),
            village=validated_data.get('village', ''),
            preferred_language=validated_data.get('preferred_language', 'Telugu / English'),
            farm_size=validated_data.get('farm_size', '5 Acres'),
            primary_crop=validated_data.get('primary_crop', 'Paddy & Tomato')
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    farm_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'full_name', 'email', 'phone', 'state', 'district', 'village',
            'preferred_language', 'farm_size', 'primary_crop', 'farm_count',
            'created_at'
        ]

    def get_farm_count(self, obj):
        return obj.user.farms.count()
