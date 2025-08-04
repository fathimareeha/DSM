from django.urls import path
from schoolapp import views

urlpatterns = [
    
    path('createvp/',views.VicePrincipalCreateListView.as_view())
  
]
