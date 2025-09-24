from django.urls import path
from .views import  HODListCreateAPIView,HODDetailAPIView,FacultyListCreateAPIView,FacultyDetailAPIView,StudentListCreateAPIView,StudentDetailAPIView,StudentBulkUploadAPIView,CoordinatorsRoleListCreateView,BookListCreateView,BookDetailView,BulkBookUploadView,HostelListCreateView,HostelDetailView,AssignHostelView,BusListCreateAPIView,BusDetailAPIView,BusStopListCreateAPIView,BusStopDetailAPIView,StudentBusAllocationListCreateAPIView,StudentBusAllocationDetailAPIView,MyBusAPIView,EventListCreateView,login_view,FacultySubjectAssignmentView,CourseDetailView,CollegeAcademicSelectionListCreateView,CourseListView,CoordinatorsRoleDetailView,HODAttendanceListCreateView,SelectedCourseCountView
from superadmin_app.views import GetCollegeByInstitution
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [

    # path("college-courses/", CollegeCourseListCreateView.as_view(), name="college-courses"),
    # path("college-departments/", CollegeDepartmentListCreateView.as_view(), name="college-departments"),

    #  path("available-courses/", AvailableCourseListView.as_view(), name="available-courses"),
    # path("available-departments/<int:course_id>/", AvailableDepartmentListView.as_view(), name="available-departments"),

    # urls.py
    path("college/academic-selections/", CollegeAcademicSelectionListCreateView.as_view(), name="college-academic-selections"),

    path("courses/", CourseListView.as_view(), name="course-list"),


    path("courses/<int:pk>/", CourseDetailView.as_view(), name="course-detail"),
    path('courses/count/', SelectedCourseCountView.as_view(), name='course-count'),
    
    path('hods/', HODListCreateAPIView.as_view(), name='list-create-hod'),
    path('hods/<int:id>/', HODDetailAPIView.as_view(), name='hod-detail'),
    path('faculties/', FacultyListCreateAPIView.as_view(), name='faculty-list-create'),
    path('faculties/<int:id>/', FacultyDetailAPIView.as_view(), name='faculty-detail'),


    path('hostels/', HostelListCreateView.as_view(), name='hostel-list-create'),
    path('hostels/<int:pk>/', HostelDetailView.as_view(), name='hostel-detail'),

    # student_id and hostel_id both in URL
    path('students/<int:student_id>/assign-hostel/<int:hostel_id>/', AssignHostelView.as_view(), name='assign-hostel'),

    
    path('students/', StudentListCreateAPIView.as_view(), name='student-list-create'),
    path('students/<int:id>/', StudentDetailAPIView.as_view(), name='student-detail'),


    path('students/upload/',StudentBulkUploadAPIView.as_view(), name='course-upload'),


    path("coordinators/", CoordinatorsRoleListCreateView.as_view(), name="coordinators-list-create"),
    path("coordinators/<int:pk>/", CoordinatorsRoleDetailView.as_view(), name="coordinator-detail"),



    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('books/upload/',BulkBookUploadView.as_view(), name='course-upload'),



    path('buses/', BusListCreateAPIView.as_view(), name='bus-list-create'),
    path('buses/<int:pk>/', BusDetailAPIView.as_view(), name='bus-detail'),

    # ---------- Bus Stop ----------
    path('bus-stops/', BusStopListCreateAPIView.as_view(), name='bus-stop-list-create'),
    path('bus-stops/<int:pk>/', BusStopDetailAPIView.as_view(), name='bus-stop-detail'),

    # ---------- Student Bus Allocation ----------
    path('student-bus-allocation/', StudentBusAllocationListCreateAPIView.as_view(), name='student-bus-allocation-list-create'),
    path('student-bus-allocation/<int:pk>/', StudentBusAllocationDetailAPIView.as_view(), name='student-bus-allocation-detail'),

    # ---------- Student's own bus info ----------
    path('my-bus/', MyBusAPIView.as_view(), name='my-bus'),

    path('get_college/<int:institution_id>/', GetCollegeByInstitution.as_view(), name='get_college'),

    path("create/", EventListCreateView.as_view(), name="event-create"),


    path('loginmembers/', login_view, name='login'),
    path("assign-subjects/", FacultySubjectAssignmentView.as_view(), name="assign-subjects"),
    path('hod-attendance/', HODAttendanceListCreateView.as_view(), name='hod-attendance-list-create'),
    
   

    
    # # path('semesters/', SemesterListCreateAPIView.as_view(), name='semester-list-create'),
    # path('semesters/<int:id>/', SemesterDetailAPIView.as_view(), name='semester-detail'),
    # path('subjects/', SubjectListCreateAPIView.as_view(), name='subject-list-create'),
    # path('subjects/<int:id>/', SubjectDetailAPIView.as_view(), name='subject-detail'),
    # path('subject-allocations/', SubjectAllocationListCreateAPIView.as_view(), name='subject-allocation-list-create'),
    # path('subject-allocations/<int:id>/', SubjectAllocationDetailAPIView.as_view(), name='subject-allocation-detail'),
   
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
