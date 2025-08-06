from django.urls import path
from .views import DepartmentListCreateView,DepartmentDetailView,HODListCreateAPIView,HODDetailAPIView,FacultyListCreateAPIView,FacultyDetailAPIView,SemesterListCreateAPIView,SemesterDetailAPIView,SubjectListCreateAPIView,SubjectDetailAPIView,SubjectAllocationListCreateAPIView,SubjectAllocationDetailAPIView# ✅ This matches your actual class name


urlpatterns = [
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('departments/<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
    path('hods/', HODListCreateAPIView.as_view(), name='list-create-hod'),
    path('hods/<int:id>/', HODDetailAPIView.as_view(), name='hod-detail'),
    path('faculties/', FacultyListCreateAPIView.as_view(), name='faculty-list-create'),
    path('faculties/<int:id>/', FacultyDetailAPIView.as_view(), name='faculty-detail'),
    path('semesters/', SemesterListCreateAPIView.as_view(), name='semester-list-create'),
    path('semesters/<int:id>/', SemesterDetailAPIView.as_view(), name='semester-detail'),
    path('subjects/', SubjectListCreateAPIView.as_view(), name='subject-list-create'),
    path('subjects/<int:id>/', SubjectDetailAPIView.as_view(), name='subject-detail'),
    path('subject-allocations/', SubjectAllocationListCreateAPIView.as_view(), name='subject-allocation-list-create'),
    path('subject-allocations/<int:id>/', SubjectAllocationDetailAPIView.as_view(), name='subject-allocation-detail'),
   
    
]
