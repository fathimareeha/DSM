from django.urls import path
from schoolapp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
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
    
    path('studentcreate/',views.StudentCreateListAPIView.as_view(), name='student-list-create'),
    path('studentdetail/<int:id>/',views.StudentDetailAPIView.as_view(), name='student-detail'),
    path('students/upload/',views.StudentBulkUploadAPIView.as_view()),

    path('bookcreate/',views.BookCreateListAPIView.as_view()),
    path('bookdetail/<int:id>/',views.BookDetailAPIView.as_view()),
    
    path('coordinators/',views.CoordinatorsRoleListCreateView.as_view(), name='coordinators-list-create'),
    path('coordinators/<int:pk>/',views.CoordinatorsRoleDetailView.as_view(), name='coordinator-detail'),
    

]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
