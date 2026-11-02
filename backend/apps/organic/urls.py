from django.urls import path
from .views import OrganicPracticeListView

urlpatterns = [
    path('', OrganicPracticeListView.as_view(), name='organic_list'),
]
