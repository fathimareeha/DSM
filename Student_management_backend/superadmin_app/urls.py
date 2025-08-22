from django.urls import path
from . import views
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import views as auth_views


urlpatterns=[
    path('login',views.AdminLoginView.as_view()),
    path('create_user/',views.CreateUserView.as_view()),
    path('delete_institutionadmin/<int:pk>',views.Institution_adminDelete.as_view()),
    path('create_staff',views.CreateListStaffView.as_view()),
    path('del_up_re_staff/<int:pk>',views.DeleteUpdateRetrieveStaffView.as_view()),
    path('token/',ObtainAuthToken.as_view()),
    path('create_school/<int:pk>',views.CreateSchoolView.as_view()),
    path('create_college/<int:pk>',views.CreateCollegeView.as_view()),
    path('std-codes/',views.STDCodeListView.as_view(), name='std-codes'),
    path('update_retrieve_delete_school/<int:pk>',views.UpdateRetireveDeleteSchoolView.as_view()),
    path('update_retrieve_delete_college/<int:pk>',views.UpdateRetireveDeleteCollegeView.as_view()),
    path('institution_login',views.InstitutionAdminLoginView.as_view()),
    path('create_package',views.CreateListPackage.as_view()),
    path('list_package',views.ListPackage.as_view()),
    path('update_retrieve_package/<int:pk>',views.UpdateRetrievePackage.as_view()),
    path('list_institutions',views.ListSchoolsCollegesView.as_view()),
    path('school_list_update_institution/<int:institution_id>/',views.GetSchoolByInstitution.as_view()),
    path('college_list_update_institution/<int:institution_id>/',views.GetCollegeByInstitution.as_view()),
    path('checkout/<int:pk>/',views.CheckoutView.as_view()),
    path('payment_verify/<int:pk>/',views.PaymentVerifyView.as_view()),
    path('deactivate',views.DeactivateView.as_view()),
    path('institution_homepage',views.Institution_HomepageView.as_view()),
    path('api/password-reset/', views.PasswordResetRequestView.as_view(), name='password-reset'),
    path('api/password-reset/confirm/', views.PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('institution_count',views.TotalInstitutionCountView.as_view()),
    path('institution_detail/<int:institution_id>/',views.InstitutionDetailView.as_view()),
    path('institution_payment/<int:institution_id>/',views.LatestPaymentReportView.as_view()),
    path('notification',views.NotificationListView.as_view()),
    path('mark_all_read/',views.mark_all_notifications_read),
    path('institution_delete/<int:pk>',views.DeleteInstitutionAndAdmin.as_view()),
    path('admin_list',views.ListInstitutionAdminsWithDetails.as_view()),
    path('university',views.UniversityView.as_view()),
    path('list_university',views.ListUniversityView.as_view()),
    path('university_detail/<int:pk>',views.UniversityDetailView.as_view()),
    path('course',views.CourseView.as_view()),
    path('course/upload/',views.BulkCourseUploadView.as_view(), name='course-upload'),
    
    path('department',views.DepartmentView.as_view()),
    path('semester',views.SemesterView.as_view()),
    path('subject',views.SubjectView.as_view()),
    path('subject/upload/',views.BulkSubjectUploadView.as_view(), name='course-upload'),
    path('user_college/', views.UserCollegeView.as_view(), name='user_college'),
   
    path('toggle-activation/<str:institution_type>/<int:pk>/', views.ToggleInstitutionActivationView.as_view(), name='toggle-activation'),
    path("pincodes/",views. KeralaPincodeListView.as_view(), name="kerala-pincode-list"),
     path('landing-page-content/<int:pk>/', views.LandingPageContentView.as_view(), name='landing-page-content'),
     path("subscription/upgrade-preview/<int:package_id>/", views.UpgradePreviewView.as_view(), name="upgrade-preview")
]