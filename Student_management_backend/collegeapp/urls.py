from django.urls import path
from .views import HODListCreateView,HODDetailView  # ✅ This matches your actual class name


urlpatterns = [
    path('hods/', HODListCreateView.as_view(), name='hod-list-create'),
    path('hods/<int:pk>/', HODDetailView.as_view(), name='hod-detail'),
]
