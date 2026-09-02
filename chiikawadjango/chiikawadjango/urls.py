from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('primeraApp/',include('primeraApp.urls')),
    path('segundaApp/',include('segundaApp.urls'))
]
