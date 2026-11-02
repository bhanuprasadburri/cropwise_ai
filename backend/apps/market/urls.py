from django.urls import path
from .views import MarketPriceListView, PredictPriceView

urlpatterns = [
    path('prices/', MarketPriceListView.as_view(), name='market_prices'),
    path('predict/', PredictPriceView.as_view(), name='market_predict'),
]
