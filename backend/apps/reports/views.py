from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import SavedReport

class SavedReportListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        reports = SavedReport.objects.filter(user=request.user).order_by('-created_at')
        data = [
            {
                "id": str(r.id),
                "title": r.title,
                "type": r.type,
                "date": r.date,
                "farmName": r.farm_name,
                "summary": r.summary
            }
            for r in reports
        ]
        return Response(data)

    def post(self, request):
        title = request.data.get('title')
        type_str = request.data.get('type', 'General Report')
        date_str = request.data.get('date', 'Today')
        farm_name = request.data.get('farmName', 'Main Farm')
        summary = request.data.get('summary', '')

        if not title:
            return Response({"error": "Report title is required."}, status=status.HTTP_400_BAD_REQUEST)

        rec = SavedReport.objects.create(
            user=request.user,
            title=title,
            type=type_str,
            date=date_str,
            farm_name=farm_name,
            summary=summary
        )
        return Response({
            "id": str(rec.id),
            "title": rec.title,
            "type": rec.type,
            "date": rec.date,
            "farmName": rec.farm_name,
            "summary": rec.summary
        }, status=status.HTTP_201_CREATED)
