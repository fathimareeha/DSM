from django.db import models
from rest_framework import generics, permissions
from .models import VicePrincipal,Subject,Standard,Section,School
from .serializer import VicePrincipalCreateSerializer,VicePrincipalDetailSerializer,SubjectSerializer,StandardSerializer,SectionSerializer



class VicePrincipalCreateListView(generics.ListCreateAPIView):
    queryset = VicePrincipal.objects.select_related('user', 'school').all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VicePrincipalCreateSerializer
        return VicePrincipalDetailSerializer
    
    
class SectionCreateListView(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]

class StandardCreateListView(generics.ListCreateAPIView):
    serializer_class = StandardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        school_id = self.kwargs['school_id']
        return Standard.objects.filter(school_id=school_id)

    def perform_create(self, serializer):
        school_id = self.kwargs['school_id']
        school = School.objects.get(id=school_id)
        serializer.save(school=school)


class SubjectCreateListView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    



    
