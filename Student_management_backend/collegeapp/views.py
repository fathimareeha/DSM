# collegeapp/views.py

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
# from .models import HOD

from .permissions import IsInstitutionAdmin


# department/views.py
from rest_framework import  permissions,generics
from .serializer import DepartmentSerializer

# views.py
from collegeapp.models import Department
from rest_framework import generics, permissions, serializers
from .models import Department
from .serializer import DepartmentSerializer
from collegeapp.models import College

class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        # Check role-based logic (optional)
        # if user.role not in ['institution_admin', 'hod']:
        #     raise serializers.ValidationError("You do not have permission to add a department.")

        # # Step 1: Get the institution
        institution = getattr(user, 'institution', None)
        if not institution:
            raise serializers.ValidationError("No institution associated with this user.")

        # Step 2: Get the associated college
        colleges = College.objects.filter(instution_obj=institution)
        if not colleges.exists():
            raise serializers.ValidationError("No colleges found for this institution.")

        # Here you can choose logic: one institution may have multiple colleges
        # If single college: pick first
        college = colleges.first()

        # Step 3: Save department with auto college assignment
        serializer.save(college=college)

# class DepartmentListCreateView(generics.ListCreateAPIView):
#     queryset = Department.objects.all()
#     serializer_class = DepartmentSerializer
#     permission_classes = [permissions.IsAuthenticated]

class DepartmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]


    
    # def perform_create(self, serializer):
    #     user = self.request.user

    #     # Get the college based on the logged-in user's relation
    #     try:
    #         college = user.college  # If UserProfile has OneToOneField to College
    #     except AttributeError:
    #         college = None

    #     if not college:
    #         raise serializer.ValidationError("User is not associated with any college.")

    #     serializer.save(college=college)




# collegeapp/serializers.py
# collegeapp/views.py
from rest_framework import generics
from .models import HOD

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # Optional: for login-required
from .models import HOD
from .serializer import HODCreateSerializer

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # optional
from .models import HOD,UserProfile
from .serializer import HODCreateSerializer , HODListSerializer# Add both serializers

class HODListCreateAPIView(generics.ListCreateAPIView):
    queryset = HOD.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return HODCreateSerializer
        return HODListSerializer
    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            hod = serializer.save()
            return Response({
                "message": "HOD created successfully.",
                "hod_id": hod.id,
                "username": hod.user.username
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated

# class HODListCreateAPIView(generics.ListCreateAPIView):
#     queryset = HOD.objects.all()
#     permission_classes = [IsAuthenticated]
    
#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return HODCreateSerializer
#         return HODListSerializer

#     def get_serializer_context(self):
#         return {'request': self.request}

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data, context=self.get_serializer_context())

#         if serializer.is_valid():
#             hod = serializer.save()
#             return Response({
#                 "message": "HOD created successfully.",
#                 "hod_id": hod.id,
#                 "username": hod.user.username
#             }, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class HODDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HOD.objects.all()
    serializer_class = HODCreateSerializer  # Handles both reading and updating
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'  # allows /hods/<id>/ instead of /hods/pk/


from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Faculty
from .serializer import FacultyCreateSerializer, FacultyListSerializer

class FacultyListCreateAPIView(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return FacultyCreateSerializer
        return FacultyListSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            faculty = serializer.save()
            return Response({
                "message": "Faculty created successfully.",
                "faculty_id": faculty.id,
                "username": faculty.user.username
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FacultyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultyCreateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'



from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Semester
from .serializer import SemesterSerializer

class SemesterListCreateAPIView(generics.ListCreateAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [IsAuthenticated]


class SemesterDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'



from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Subject
from .serializer import SubjectSerializer

class SubjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]


class SubjectDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'



from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import SubjectAllocation
from .serializer import SubjectAllocationSerializer

class SubjectAllocationListCreateAPIView(generics.ListCreateAPIView):
    queryset = SubjectAllocation.objects.all()
    serializer_class = SubjectAllocationSerializer
    permission_classes = [IsAuthenticated]


class SubjectAllocationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubjectAllocation.objects.all()
    serializer_class = SubjectAllocationSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
