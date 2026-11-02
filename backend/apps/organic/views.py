from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import OrganicPractice

class OrganicPracticeListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        crop = request.query_params.get('crop', '')
        qs = OrganicPractice.objects.all()
        if crop:
            qs = qs.filter(crop__icontains=crop)
        
        data = [
            {
                "crop": o.crop,
                "stage": o.stage,
                "practiceType": o.practice_type,
                "title": o.title,
                "description": o.description,
                "howToApply": o.how_to_apply,
                "frequency": o.frequency,
                "benefits": o.benefits,
                "precautions": o.precautions
            }
            for o in qs
        ]
        return Response(data)
