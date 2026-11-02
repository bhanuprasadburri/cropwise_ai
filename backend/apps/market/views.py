from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import MarketPrice
from ai.price_prediction.predictor import PricePredictionService

class MarketPriceListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        crop = request.query_params.get('crop', 'Paddy')
        state = request.query_params.get('state', 'Andhra Pradesh')
        
        prices = MarketPrice.objects.filter(crop__icontains=crop).order_by('-date')[:30]
        data = [
            {
                "id": str(p.id),
                "crop": p.crop,
                "state": p.state,
                "district": p.district,
                "market": p.market,
                "date": str(p.date),
                "modalPrice": p.modal_price,
                "arrivalQuantity": p.arrival_quantity
            }
            for p in prices
        ]
        return Response(data)

class PredictPriceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        crop_name = request.data.get('crop', 'Paddy')
        horizon_days = int(request.data.get('horizon_days', 30))
        current_price = float(request.data.get('current_price', 2300.0))

        forecast = PricePredictionService.forecast_price(current_price, horizon_days=horizon_days)
        forecast['crop'] = crop_name
        return Response(forecast)
