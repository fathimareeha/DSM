from django.urls import path
from schoolapp import views

urlpatterns = [
    
    path('createvp/',views.VicePrincipalCreateListView.as_view()),
    path('subjectcreate/',views.SubjectCreateListView.as_view()),
    path('standardcreate/<int:school_id>/',views.StandardCreateListView.as_view()),
    path('sectioncreate/',views.SectionCreateListView.as_view())
  
]
