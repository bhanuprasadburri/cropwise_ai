from rest_framework import viewsets, permissions
from .models import Farm
from .serializers import FarmSerializer

class FarmViewSet(viewsets.ModelViewSet):
    serializer_class = FarmSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Strict user isolation: User A cannot read or mutate User B's farms
        return Farm.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
