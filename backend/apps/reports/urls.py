from django.urls import path
from .views import SavedReportListView

urlpatterns = [
    path('', SavedReportListView.as_view(), name='report_list'),
]
