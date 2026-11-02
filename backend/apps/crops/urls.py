from django.urls import path
from .views import CropListView, RecommendCropsView

urlpatterns = [
    path('', CropListView.as_view(), name='crop_list'),
    path('recommend/', RecommendCropsView.as_view(), name='crop_recommend'),
]
