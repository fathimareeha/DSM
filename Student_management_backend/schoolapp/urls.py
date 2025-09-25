from django.urls import path
from schoolapp import views
from django.conf import settings
from django.conf.urls.static import static
from.views import toggle_section_status,staff_login
urlpatterns = [
    
    
    
    path("toggle-section/<int:pk>/", views.toggle_section_status, name="toggle-section"),
    path("staff-login/", views.staff_login, name="staff-login"),
    # path("staff_login/",staff_login, name="login"),
    
    
    # path('createvp/',views.VicePrincipalCreateListView.as_view(),name='vp_create_list'),
    # path('vpdetails/<int:id>/',views.VicePrincipalDetailView.as_view(),name='vp_details'),
    
    
    #    # ---------------- Standard URLs ----------------
    # path("standards/", views.get_standards, name="get_standards"),  # GET list
    # path("standards/create/", views.create_standard, name="create_standard"),  # POST create
    # path("standards/<int:id>/edit/", views.edit_standard, name="edit_standard"),  # PUT/PATCH edit
    # path("standards/<int:id>/delete/", views.delete_standard, name="delete_standard"),  # DELETE

    # # ---------------- Section URLs ----------------
    # path("standards/<int:standard_id>/sections/", views.get_sections_by_standard, name="get_sections_by_standard"),  # GET sections under standard
    # path("sections/create/", views.create_section, name="create_section"),  # POST create
    # path("sections/<int:id>/edit/", views.edit_section, name="edit_section"),  # PUT/PATCH edit
    # path("sections/<int:id>/delete/", views.delete_section, name="delete_section"),  # DELETE
    # path("sections/<int:id>/toggle/", views.toggle_section, name="toggle_section"),  # PATCH toggle active/inactive

    
    # path('subjectcreate/',views.SubjectCreateListView.as_view(),name='sub_create'),
    # path("subjectdetail/<int:id>/",views.SubjectDetailAPIView.as_view(), name="sub_details"), ##sub taken using sub_id
    
    # path("teacher/", views.TeacherListCreateView.as_view(), name="teacher-list-create"),
    # path("teachers/<int:id>/", views.TeacherDetailView.as_view(), name="teacher-detail"),
    
    
   # ------------------ Standards ------------------
    path('standards/', views.get_standards, name='get_standards'),                 # GET all standards
    path('standards/create/', views.create_standard, name='create_standard'),      # POST create standard
    path('standards/<int:id>/edit/', views.edit_standard, name='edit_standard'),   # PUT/PATCH update
    path('standards/<int:id>/delete/', views.delete_standard, name='delete_standard'), # DELETE standard

    # ------------------ Sections ------------------
    path('standards/<int:standard_id>/sections/', views.get_sections_by_standard, name='get_sections_by_standard'), # GET sections under a standard
    path('sections/create/', views.create_section, name='create_section'),         # POST create section
    path('sections/<int:id>/edit/', views.edit_section, name='edit_section'),      # PUT/PATCH update section
    path('sections/<int:id>/toggle/', views.toggle_section, name='toggle_section'), # PATCH toggle active/inactive
    path('sections/<int:id>/delete/', views.delete_section, name='delete_section'), # DELETE section

    # ------------------ Teachers ------------------
    path('teachers/', views.TeacherListCreateView.as_view(), name='teacher_list_create'),  # GET list, POST create
    path('teachers/<int:id>/', views.TeacherDetailView.as_view(), name='teacher_detail'),  # GET, PUT/PATCH, DELETE

    # ------------------ Subjects ------------------
    path('subjects/', views.SubjectListCreateView.as_view(), name='subject_list_create'),  # GET list, POST create
    path('subjects/<int:id>/', views.SubjectDetailView.as_view(), name='subject_detail'),   # GET, PUT/PATCH, DELETE

    
    path('hostels/',views.HostelListCreateView.as_view(), name='hostel-list-create'),
    path('hostels/<int:id>/',views.HostelDetailView.as_view(), name='hostel-detail'),
    
    path('studentcreate/',views.StudentCreateListAPIView.as_view(), name='student-list-create'),
    path('studentdetail/<int:id>/',views.StudentDetailAPIView.as_view(), name='student-detail'),
    path('students/upload/',views.StudentBulkUploadAPIView.as_view()),

    path('bookcreate/',views.BookCreateListAPIView.as_view()),
    path('bookdetail/<int:id>/',views.BookDetailAPIView.as_view()),
    
    

    path('staffs/',views.StaffRoleListCreateView.as_view(), name='staffs-list-create'),
    path('staffsdetail/<int:id>/',views.StaffRoleDetailView.as_view(), name='staff-detail'),
    
    
    
    path('buses/',views.BusListCreateAPIView.as_view(), name='bus-list-create'),
    path('buses/<int:pk>/',views.BusDetailAPIView.as_view(), name='bus-detail'),

    # ---------- Bus Stop ----------
    path('bus-stops/',views.BusStopListCreateAPIView.as_view(), name='bus-stop-list-create'),
    path('bus-stops/<int:pk>/',views.BusStopDetailAPIView.as_view(), name='bus-stop-detail'),

    # ---------- Student Bus Allocation ----------
    path('student-bus-allocation/',views.StudentBusAllocationListCreateAPIView.as_view(), name='student-bus-allocation-list-create'),
    path('student-bus-allocation/<int:pk>/',views.StudentBusAllocationDetailAPIView.as_view(), name='student-bus-allocation-detail'),


]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
