from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

class WeatherForecastView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        location = request.query_params.get('location', 'Narasaraopet, Palnadu, AP')
        return Response({
            "location": location,
            "currentTemp": 28.0,
            "condition": "Partly Cloudy with Humidity",
            "humidity": 74,
            "rainfall": 12.0,
            "windSpeed": 14.0,
            "soilMoisture": 62,
            "uvIndex": 6,
            "advisories": [
                "🌧 Rain expected tomorrow afternoon (18mm) - delay pesticide application & irrigation.",
                "🦠 High humidity (74%) increases fungal blight risk in solanaceous vegetable crops.",
                "🌾 Favorable soil moisture (62%) for Kharif paddy tillering phase."
            ],
            "tempTrend": [
                {"time": "06:00 AM", "temp": 24, "humidity": 85},
                {"time": "09:00 AM", "temp": 27, "humidity": 78},
                {"time": "12:00 PM", "temp": 31, "humidity": 68},
                {"time": "03:00 PM", "temp": 33, "humidity": 65},
                {"time": "06:00 PM", "temp": 29, "humidity": 75},
                {"time": "09:00 PM", "temp": 26, "humidity": 82}
            ],
            "dailyForecast": [
                {"day": "Today", "date": "02 Sep", "tempMax": 33, "tempMin": 24, "condition": "Partly Cloudy", "rainProbability": 30, "humidity": 74, "windSpeed": 14},
                {"day": "Thu", "date": "03 Sep", "tempMax": 30, "tempMin": 23, "condition": "Rainy", "rainProbability": 85, "humidity": 88, "windSpeed": 18},
                {"day": "Fri", "date": "04 Sep", "tempMax": 29, "tempMin": 23, "condition": "Thunderstorm", "rainProbability": 75, "humidity": 84, "windSpeed": 20},
                {"day": "Sat", "date": "05 Sep", "tempMax": 31, "tempMin": 24, "condition": "Partly Cloudy", "rainProbability": 40, "humidity": 76, "windSpeed": 12},
                {"day": "Sun", "date": "06 Sep", "tempMax": 32, "tempMin": 24, "condition": "Sunny", "rainProbability": 15, "humidity": 68, "windSpeed": 10},
                {"day": "Mon", "date": "07 Sep", "tempMax": 33, "tempMin": 25, "condition": "Sunny", "rainProbability": 10, "humidity": 65, "windSpeed": 11},
                {"day": "Tue", "date": "08 Sep", "tempMax": 34, "tempMin": 25, "condition": "Cloudy", "rainProbability": 25, "humidity": 70, "windSpeed": 13}
            ]
        })
