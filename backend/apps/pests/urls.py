from django.urls import path
from .views import PestListView

urlpatterns = [
    path('', PestListView.as_view(), name='pest_list'),
]
