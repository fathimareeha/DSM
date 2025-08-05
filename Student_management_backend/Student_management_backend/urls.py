
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('superadmin_app/',include ('superadmin_app.urls')),

    path('schoolapp/',include('schoolapp.urls')),
    path('collegeapp/',include('collegeapp.urls'))
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
