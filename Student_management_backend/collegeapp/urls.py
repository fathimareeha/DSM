from django.urls import path
from .views import DepartmentListCreateView,DepartmentDetailView,HODListCreateView,HODDetailView  # ✅ This matches your actual class name


urlpatterns = [
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('departments/<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
    path('hods/', HODListCreateView.as_view(), name='hod-list-create'),
    path('hods/<int:pk>/', HODDetailView.as_view(), name='hod-detail'),
   
    
]
