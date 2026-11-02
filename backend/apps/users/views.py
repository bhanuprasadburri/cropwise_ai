from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserRegisterSerializer, ProfileSerializer
from .models import Profile

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            profile = user.profile
            return Response({
                "message": "User registered successfully",
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                },
                "user": ProfileSerializer(profile).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = (request.data.get('email') or request.data.get('username') or '').strip().lower()
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if not email.endswith('@gmail.com'):
            return Response({"error": "Email must be a valid @gmail.com address."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)
        if not user:
            return Response({"error": "Invalid login credentials. User not found or incorrect password in database."}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        profile, _ = Profile.objects.get_or_create(user=user, defaults={'full_name': user.first_name or user.email})
        
        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            },
            "user": ProfileSerializer(profile).data
        })


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = Profile.objects.get_or_create(user=request.user, defaults={'full_name': request.user.first_name or request.user.email})
        return Response(ProfileSerializer(profile).data)

    def put(self, request):
        profile, _ = Profile.objects.get_or_create(user=request.user, defaults={'full_name': request.user.first_name or request.user.email})
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
