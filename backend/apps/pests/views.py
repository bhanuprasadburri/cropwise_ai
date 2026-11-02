from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Pest

class PestListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        crop = request.query_params.get('crop', '')
        qs = Pest.objects.all()
        if crop:
            qs = qs.filter(crop__icontains=crop)

        data = [
            {
                "crop": p.crop,
                "pestName": p.pest_name,
                "stage": p.stage,
                "severity": p.severity,
                "symptoms": p.symptoms,
                "culturalControl": p.cultural_control,
                "mechanicalControl": p.mechanical_control,
                "biologicalControl": p.biological_control,
                "chemicalControl": p.chemical_control,
                "safetyWarning": p.safety_warning
            }
            for p in qs
        ]
        return Response(data)
