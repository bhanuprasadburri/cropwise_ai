from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import Crop

class CropListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        crops = Crop.objects.all()
        data = [
            {
                "id": str(c.id),
                "name": c.name,
                "category": c.category,
                "image": c.image,
                "bestSeason": c.best_season,
                "waterRequirement": c.water_requirement,
                "durationDays": c.duration_days,
                "expectedYield": c.expected_yield,
                "currentPrice": c.current_price,
                "predictedPrice": c.predicted_price,
                "priceTrendPercent": c.price_trend_percent,
                "description": c.description
            }
            for c in crops
        ]
        return Response(data)


class RecommendCropsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        season = request.data.get('season', 'Kharif')
        soil_type = request.data.get('soilType', 'Clay Loam')
        soil_ph = float(request.data.get('soilPh', 6.8))
        water = request.data.get('waterAvailability', 'High')
        farm_area = float(request.data.get('farmArea', 5.0))

        crops = Crop.objects.all()
        results = []

        for crop in crops:
            score = 70.0

            # Season compatibility
            if crop.best_season == season or crop.best_season == 'All Seasons':
                score += 15
            else:
                score -= 10

            # Water availability match
            if water == 'High' and crop.water_requirement == 'High':
                score += 10
            elif water == 'Low' and crop.water_requirement == 'Low':
                score += 12
            elif water == 'Low' and crop.water_requirement == 'High':
                score -= 20

            # Soil pH compatibility
            if 6.0 <= soil_ph <= 7.5:
                score += 8
            else:
                score -= 5

            # Price trend boost
            score += min(10, max(0, crop.price_trend_percent))

            final_score = int(min(98, max(42, score)))

            # Match label
            if final_score >= 90:
                match_label = "Excellent Match"
            elif final_score >= 75:
                match_label = "Very Good Match"
            elif final_score >= 60:
                match_label = "Good Match"
            elif final_score >= 40:
                match_label = "Moderate Match"
            else:
                match_label = "Not Recommended"

            # Dynamic explanation
            why_text = f"{crop.name} is recommended because your target {season} season, {soil_type} soil profile (pH {soil_ph}), and {water.lower()} water availability align with optimal growth parameters."
            if "Paddy" in crop.name:
                why_text = f"Paddy BPT 5204 is the top match for {season} in {soil_type} soil with strong mandi price demand (+7.8%) and standing water capacity."
            elif "Tomato" in crop.name:
                why_text = f"Hybrid Tomato yields high financial returns (₹{crop.currentPrice}/qtl, +13.5% trend) and suits your {farm_area}-acre plot."

            results.append({
                "id": str(crop.id),
                "name": crop.name,
                "category": crop.category,
                "image": crop.image,
                "bestSeason": crop.best_season,
                "waterRequirement": crop.water_requirement,
                "durationDays": crop.duration_days,
                "expectedYield": crop.expected_yield,
                "currentPrice": crop.current_price,
                "predictedPrice": crop.predicted_price,
                "priceTrendPercent": crop.price_trend_percent,
                "suitabilityScore": final_score,
                "matchLabel": match_label,
                "profitPotential": "High" if final_score >= 80 else "Moderate",
                "whyRecommended": why_text,
                "description": crop.description
            })

        results.sort(key=lambda x: x["suitabilityScore"], reverse=True)
        return Response(results)
