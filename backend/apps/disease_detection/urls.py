from django.urls import path
from .views import PredictDiseaseView, DiseaseHistoryView

urlpatterns = [
    path('predict/', PredictDiseaseView.as_view(), name='disease_predict'),
    path('history/', DiseaseHistoryView.as_view(), name='disease_history'),
]
