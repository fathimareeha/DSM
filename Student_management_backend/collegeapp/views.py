# collegeapp/views.py

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import HOD
from .serializer import HODSerializer, HODCreateSerializer
from .permissions import IsInstitutionAdmin

class HODListCreateView(generics.ListCreateAPIView):
    queryset = HOD.objects.all()
    permission_classes = [IsAuthenticated, IsInstitutionAdmin]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return HODCreateSerializer
        return HODSerializer

class HODDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HOD.objects.all()
    serializer_class = HODSerializer
    permission_classes = [IsAuthenticated, IsInstitutionAdmin]
