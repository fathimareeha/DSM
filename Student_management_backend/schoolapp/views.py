from django.db import models
from rest_framework import generics, permissions,status,parsers
from .models import Subject,Standard,Section,Teacher,Student,Book,Hostel
from .serializer import SubjectSerializer,BookSerializer,BookDetailSerializer,StudentCreateSerializer,StudentDetailSerializer,HostelSerializer,LoginSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError

##LOGIN 

# schoolapp/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def toggle_section_status(request, pk):
    # your logic here
    return Response({"msg": "Toggled"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def staff_login(request):
    # your login logic
    return Response({"msg": "Login success"}, status=status.HTTP_200_OK)



from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework import status

@api_view(['POST'])
def staff_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        })
    else:
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)



## VICE PRINCIPAL ##

# from django.db import IntegrityError
# from rest_framework import generics, permissions, parsers, status
# from rest_framework.response import Response

# from .models import VicePrincipal
# from .serializer import VicePrincipalCreateSerializer, VicePrincipalDetailSerializer


# class VicePrincipalCreateListView(generics.ListCreateAPIView):
#     serializer_class = VicePrincipalCreateSerializer
#     queryset = VicePrincipal.objects.select_related('userprofile').all()
#     permission_classes = [permissions.IsAuthenticated]
#     parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]

#     # Custom create
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             try:
#                 vp = serializer.save()
#                 return Response({
#                     "message": "Vice Principal created successfully.",
#                     "vp_id": vp.id,
#                     "username": vp.userprofile.username,
#                     "email": vp.userprofile.email,
#                     "phone": vp.phone,
#                     "profile_picture": vp.profile_picture.url if vp.profile_picture else None
#                 }, status=status.HTTP_201_CREATED)
#             except IntegrityError:
#                 return Response(
#                     {"error": "Username already exists."},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Custom list
#     def list(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         data = [
#             {
#                 "vp_id": vp.id,
#                 "username": vp.userprofile.username,
#                 "email": vp.userprofile.email,
#                 "phone": vp.phone,
#                 "profile_picture": vp.profile_picture.url if vp.profile_picture else None
#             }
#             for vp in queryset
#         ]
#         return Response(data, status=status.HTTP_200_OK)



# from rest_framework import generics
# from .models import VicePrincipal
# from .serializer import VicePrincipalDetailSerializer, VicePrincipalUpdateSerializer

# class VicePrincipalDetailView(generics.RetrieveUpdateDestroyAPIView):  # ✅ allows DELETE
#     queryset = VicePrincipal.objects.all()
#     permission_classes = [permissions.IsAuthenticated]
#     lookup_field = 'id'

#     def get_serializer_class(self):
#         if self.request.method == "GET":
#             return VicePrincipalDetailSerializer
#         return VicePrincipalUpdateSerializer


 
 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from .models import Standard, Section, Teacher, Subject
from .serializer import (
    StandardSerializer,
    SectionSerializer,
    TeacherSerializer,
    SubjectSerializer
)

# ------------------ Standards ----------------


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Standard, Section

# ------------------ Standard Views ------------------

# List all standards with their sections
@api_view(['GET'])
def get_standards(request):
    standards = Standard.objects.all()
    data = []
    for s in standards:
        data.append({
            "id": s.id,
            "name": s.name,
            "sections": [
                {"id": sec.id, "name": sec.name, "is_active": sec.is_active}
                for sec in s.sections.all()
            ]
        })
    return Response(data, status=status.HTTP_200_OK)

# Create a standard
@api_view(['POST'])
def create_standard(request):
    name = request.data.get('name')
    if not name:
        return Response({'error': 'Name required'}, status=status.HTTP_400_BAD_REQUEST)
    standard = Standard.objects.create(name=name)
    return Response({'id': standard.id, 'name': standard.name}, status=status.HTTP_201_CREATED)

# Edit/Update a standard
@api_view(['PUT', 'PATCH'])
def edit_standard(request, id):
    try:
        standard = Standard.objects.get(id=id)
    except Standard.DoesNotExist:
        return Response({'error': 'Standard not found'}, status=status.HTTP_404_NOT_FOUND)

    name = request.data.get("name", standard.name)
    standard.name = name
    standard.save()
    return Response({'id': standard.id, 'name': standard.name}, status=status.HTTP_200_OK)

# Delete a standard
@api_view(['DELETE'])
def delete_standard(request, id):
    try:
        standard = Standard.objects.get(id=id)
    except Standard.DoesNotExist:
        return Response({'error': 'Standard not found'}, status=status.HTTP_404_NOT_FOUND)

    standard.delete()
    return Response({'message': 'Standard deleted successfully'}, status=status.HTTP_200_OK)

# ------------------ Section Views ------------------

# Get sections under a standard
@api_view(['GET'])
def get_sections_by_standard(request, standard_id):
    try:
        standard = Standard.objects.get(id=standard_id)
    except Standard.DoesNotExist:
        return Response({'error': 'Standard not found'}, status=status.HTTP_404_NOT_FOUND)

    sections = [
        {"id": sec.id, "name": sec.name, "is_active": sec.is_active}
        for sec in standard.sections.all()
    ]
    return Response(sections, status=status.HTTP_200_OK)

# Create a section
@api_view(['POST'])
def create_section(request):
    name = request.data.get('name')
    standard_id = request.data.get('standard')
    if not name or not standard_id:
        return Response({'error': 'All fields required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        standard = Standard.objects.get(id=standard_id)
    except Standard.DoesNotExist:
        return Response({'error': 'Standard not found'}, status=status.HTTP_404_NOT_FOUND)

    section = Section.objects.create(name=name, standard=standard)
    return Response(
        {'id': section.id, 'name': section.name, 'is_active': section.is_active},
        status=status.HTTP_201_CREATED
    )

# Edit/Update a section
@api_view(['PUT', 'PATCH'])
def edit_section(request, id):
    try:
        section = Section.objects.get(id=id)
    except Section.DoesNotExist:
        return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)

    section.name = request.data.get("name", section.name)
    section.save()
    return Response(
        {'id': section.id, 'name': section.name, 'is_active': section.is_active},
        status=status.HTTP_200_OK
    )

# Toggle section status (active/inactive)
@api_view(['PATCH'])
def toggle_section(request, id):   # ✅ renamed to match URL
    try:
        section = Section.objects.get(id=id)
    except Section.DoesNotExist:
        return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)

    section.is_active = not section.is_active
    section.save()
    return Response({"message": "Section status updated", "is_active": section.is_active}, status=status.HTTP_200_OK)

# Delete a section
@api_view(['DELETE'])
def delete_section(request, id):
    try:
        section = Section.objects.get(id=id)
    except Section.DoesNotExist:
        return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)

    section.delete()
    return Response({'message': 'Section deleted successfully'}, status=status.HTTP_200_OK)



# ------------------ Teachers ----------------

class TeacherListCreateView(generics.ListCreateAPIView):
    queryset = Teacher.objects.all().prefetch_related('subjects').select_related('user')
    serializer_class = TeacherSerializer


class TeacherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all().prefetch_related('subjects').select_related('user')
    serializer_class = TeacherSerializer
    lookup_field = 'id'

# ------------------ Subjects ----------------

class SubjectListCreateView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class SubjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    
    
# ✅ Hostel CRUD
class HostelListCreateView(generics.ListCreateAPIView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer
    permission_classes = [permissions.IsAuthenticated]


class HostelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


# ✅ Assign hostel to student
# views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.shortcuts import get_object_or_404
# from .models import Student, Hostel

# class AssignHostelView(APIView):
#     def patch(self, request, student_id, hostel_id):
#         # Get student
#         student = get_object_or_404(Student, id=student_id)

#         # Get hostel
#         hostel = get_object_or_404(Hostel, id=hostel_id)

#         # Check if hostel is full
#         current_occupancy = Student.objects.filter(hostel=hostel).count()
#         if current_occupancy >= hostel.intake:
#             return Response(
#                 {"error": "Hostel is already full"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Assign hostel to student
#         student.hostel = hostel
#         student.save()

#         # Updated occupancy after assigning
#         current_occupancy = Student.objects.filter(hostel=hostel).count()

#         return Response({
#             "id": student.id,
#             "user": student.user.id,
#             "roll_no": student.roll_no,
#             "hostel": hostel.id,
#             "hostel_name": hostel.name,
#             "room_number": getattr(student, "room_number", None),
#             "current_occupancy": current_occupancy,
#             "hostel_capacity": hostel.intake
#         }, status=status.HTTP_200_OK)




# ===============================================
# LIST + CREATE STUDENT
from rest_framework import generics, permissions
from .models import Student
from .serializer import (
    StudentCreateSerializer,
    StudentListSerializer,
    StudentDetailSerializer
)


# ======================================
# LIST + CREATE STUDENT
# ======================================
class StudentCreateListAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return StudentCreateSerializer
        return StudentListSerializer


# ======================================
# RETRIEVE + UPDATE + DELETE STUDENT
# ======================================
class StudentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        return StudentDetailSerializer

import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from .serializer import StudentDetailSerializer

class StudentBulkUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("FILES:", request.FILES)
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = pd.read_excel(excel_file)
            df.columns = df.columns.str.strip()  # remove extra spaces
            print("Excel columns:", df.columns.tolist())  # DEBUG
        except Exception as e:
            return Response({"error": f"Failed to read Excel file: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        # Columns expected in your Excel file (should match serializer fields)
        expected_columns = [
            'admissionNumber', 'rollNo', 'studentName', 'standard', 'section',
            'gender', 'dob', 'Email', 'studentAddress', 'parentname',
            'relationship', 'parentPhone', 'profilePic'
        ]

        # Validate columns
        for col in expected_columns:
            if col not in df.columns:
                return Response({"error": f"Missing required column: {col}"}, status=status.HTTP_400_BAD_REQUEST)

        success_count = 0
        errors = []

        # Process each row
        for index, row in df.iterrows():
            data = row.to_dict()

            # Drop 'id' if it exists in Excel
            data.pop('id', None)

            # Handle empty profile picture
            if pd.isna(data.get('profilePic')):
                data['profilePic'] = None

            # Convert dob to date only
            if pd.notna(data.get('dob')):
                try:
                    data['dob'] = pd.to_datetime(data['dob']).date()
                except Exception:
                    data['dob'] = None

            # Ensure phone numbers are strings
            if pd.notna(data.get('parentPhone')):
                data['parentPhone'] = str(data['parentPhone'])

            serializer = StudentDetailSerializer(data=data)
            if serializer.is_valid():
                try:
                    with transaction.atomic():
                        serializer.save()
                    success_count += 1
                except Exception as e:
                    errors.append({"row": index + 2, "error": str(e)})
            else:
                errors.append({"row": index + 2, "error": serializer.errors})

        return Response({
            "message": f"{success_count} students created successfully.",
            "errors": errors
        }, status=status.HTTP_201_CREATED if success_count > 0 else status.HTTP_400_BAD_REQUEST)

    
class BookCreateListAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all().order_by('-added_on')
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]
    


class BookDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a single book.
    """
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import StaffRole
from .serializer import StaffRoleSerializer


# 📌 List + Create Staff Roles
# 📌 List and Create Staff Roles
class StaffRoleListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        staff_roles = StaffRole.objects.select_related("user").all()
        serializer = StaffRoleSerializer(staff_roles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StaffRoleSerializer(data=request.data)
        if serializer.is_valid():
            staff_role = serializer.save()
            return Response({
                "message": "Staff account created successfully",
                "data": StaffRoleSerializer(staff_role).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 📌 Retrieve, Update, Delete Staff Role
class StaffRoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StaffRole.objects.select_related("user").all()
    serializer_class = StaffRoleSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    
    # Optional: handle custom response for update
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "message": "Staff account updated successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    # Optional: handle custom response for delete
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Staff account deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

from rest_framework import generics
from rest_framework.response import Response
from .models import Bus, BusStop, StudentBusAllocation
from .serializer import BusSerializer, BusStopSerializer, StudentBusAllocationSerializer
from rest_framework.permissions import IsAuthenticated

# ---------- Bus ----------
class BusListCreateAPIView(generics.ListCreateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [IsAuthenticated]

class BusDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = [IsAuthenticated]


# ---------- Bus Stop ----------
class BusStopListCreateAPIView(generics.ListCreateAPIView):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer
    permission_classes = [IsAuthenticated]

class BusStopDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer
    permission_classes = [IsAuthenticated]


# ---------- Student Bus Allocation ----------
class StudentBusAllocationListCreateAPIView(generics.ListCreateAPIView):
    queryset = StudentBusAllocation.objects.all()
    serializer_class = StudentBusAllocationSerializer
    permission_classes = [IsAuthenticated]

class StudentBusAllocationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentBusAllocation.objects.all()
    serializer_class = StudentBusAllocationSerializer
    permission_classes = [IsAuthenticated]



