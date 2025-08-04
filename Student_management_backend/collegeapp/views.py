# collegeapp/views.py

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import HOD
from .serializer import HODSerializer, HODCreateSerializer
from .permissions import IsInstitutionAdmin


# department/views.py
from rest_framework import  permissions,generics
from .serializer import DepartmentSerializer

# views.py
from collegeapp.models import Department
class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class DepartmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]



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


