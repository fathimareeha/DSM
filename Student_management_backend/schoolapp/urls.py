from django.urls import path
from schoolapp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    
    path("staff_login/", views.staff_login, name="login"),
    
    
    path('createvp/',views.VicePrincipalCreateListView.as_view(),name='vp_create_list'),
    path('vpdetails/<int:id>/',views.VicePrincipalDetailAPIView.as_view(),name='vp_details'),
    
    path('sectioncreate/',views.SectionCreateListView.as_view(),name='section_create'),
    path('sectiondetail/<int:id>/',views.SectionDetailAPIView.as_view()),
    
    path('standardcreate/',views.StandardCreateListView.as_view(),name='std_create'),
    path('standarddetail/<int:id>/',views.StandardDetailAPIView.as_view()),
    
    path('subjectcreate/',views.SubjectCreateListView.as_view(),name='sub_create'),
    path("subjectdetail/<int:id>/",views.SubjectDetailAPIView.as_view(), name="sub_details"), ##sub taken using sub_id
    
    path('teachercreate/',views.TeacherCreateListView.as_view()),
    path('teacherdetail/<int:id>/',views.TeacherDetailAPIView.as_view()),
    
    path('hostels/',views.HostelListCreateView.as_view(), name='hostel-list-create'),
    path('hostels/<int:pk>/',views.HostelDetailView.as_view(), name='hostel-detail'),
    
    path('studentcreate/',views.StudentCreateListAPIView.as_view(), name='student-list-create'),
    path('studentdetail/<int:id>/',views.StudentDetailAPIView.as_view(), name='student-detail'),
    path('students/upload/',views.StudentBulkUploadAPIView.as_view()),

    path('bookcreate/',views.BookCreateListAPIView.as_view()),
    path('bookdetail/<int:id>/',views.BookDetailAPIView.as_view()),
    
    path('staffs/',views.StaffRoleListAPIView.as_view(), name='staffs-list-create'),
    path('staffsdeatail/<int:pk>/',views.StaffRoleDetailAPIView.as_view(), name='staff-detail'),
    
    
    
    path('buses/',views.BusListCreateAPIView.as_view(), name='bus-list-create'),
    path('buses/<int:pk>/',views.BusDetailAPIView.as_view(), name='bus-detail'),

    # ---------- Bus Stop ----------
    path('bus-stops/',views.BusStopListCreateAPIView.as_view(), name='bus-stop-list-create'),
    path('bus-stops/<int:pk>/',views.BusStopDetailAPIView.as_view(), name='bus-stop-detail'),

    # ---------- Student Bus Allocation ----------
    path('student-bus-allocation/',views.StudentBusAllocationListCreateAPIView.as_view(), name='student-bus-allocation-list-create'),
    path('student-bus-allocation/<int:pk>/',views.StudentBusAllocationDetailAPIView.as_view(), name='student-bus-allocation-detail'),


]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
