from django.urls import path
from . import views
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import views as auth_views

urlpatterns=[
    path('create_user/',views.CreateUserView.as_view()),
    path('delete_institutionadmin/<int:pk>',views.Institution_adminDelete.as_view()),
    path('create_staff',views.CreateStaffView.as_view()),
    path('token/',ObtainAuthToken.as_view()),
    path('create_school/<int:pk>',views.CreateSchoolView.as_view()),
    path('create_college/<int:pk>',views.CreateCollegeView.as_view()),
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
   
]