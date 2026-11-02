from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, serializers
from ai.disease_detection.service import DiseaseDetectionService
from .models import DiseasePrediction
from apps.farms.models import Farm

class DiseasePredictionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = DiseasePrediction
        fields = ['id', 'crop', 'disease', 'confidence', 'severity', 'model_version', 'image_url', 'created_at']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class PredictDiseaseView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if 'image' not in request.FILES:
            return Response({"error": "No image file provided in multipart request."}, status=status.HTTP_400_BAD_REQUEST)

        image_file = request.FILES['image']
        target_crop = request.data.get('crop', 'Tomato')
        farm_id = request.data.get('farm_id')

        # Execute AI Disease Detection Service Prediction
        result = DiseaseDetectionService.predict(image_file, target_crop=target_crop)

        if not result.get('success', False):
            return Response({
                "error": result.get('error', "Unable to confidently identify this crop/disease."),
                "is_out_of_distribution": result.get('is_out_of_distribution', True),
                "confidence": result.get('confidence', 0.0)
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # Retrieve user farm if provided
        farm_obj = None
        if farm_id:
            farm_obj = Farm.objects.filter(id=farm_id, user=request.user).first()

        # Save prediction instance to database
        prediction_rec = DiseasePrediction.objects.create(
            user=request.user,
            farm=farm_obj,
            image=image_file,
            crop=result['crop'],
            disease=result['disease'],
            confidence=result['confidence'],
            severity=result['severity'],
            model_version=result.get('model_version', 'MobileNetV2-Agri-v2.4')
        )

        result['prediction_id'] = prediction_rec.id
        result['image_url'] = prediction_rec.image.url

        return Response(result, status=status.HTTP_200_OK)


class DiseaseHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        predictions = DiseasePrediction.objects.filter(user=request.user).order_by('-created_at')
        serializer = DiseasePredictionSerializer(predictions, many=True)
        return Response(serializer.data)
