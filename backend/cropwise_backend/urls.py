from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/profile/', include('apps.users.profile_urls')),
    path('api/farms/', include('apps.farms.urls')),
    path('api/disease/', include('apps.disease_detection.urls')),
    path('api/crops/', include('apps.crops.urls')),
    path('api/market/', include('apps.market.urls')),
    path('api/weather/', include('apps.weather.urls')),
    path('api/organic/', include('apps.organic.urls')),
    path('api/pests/', include('apps.pests.urls')),
    path('api/reports/', include('apps.reports.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
