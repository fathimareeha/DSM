from django.db import models
from rest_framework import generics, permissions,status,parsers
from .models import VicePrincipal,Subject,Standard,Section,Teacher,Student,Book,Hostel,StaffRole
from .serializer import VicePrincipalCreateSerializer,VicePrincipalDetailSerializer,VicePrincipalUpdateSerializer,SubjectSerializer,StandardSerializer,SectionSerializer,TeacherSerializer,TeacherDetailSerializer,BookSerializer,BookDetailSerializer,StudentCreateSerializer,StudentDetailSerializer,HostelSerializer,StaffRoleSerializer,LoginSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError

##LOGIN 



# hod/views.py
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

# from rest_framework.decorators import api_view


# @api_view(["POST"])
# def staff_login(request):
#     serializer = LoginSerializer(data=request.data)
#     if serializer.is_valid():
#         return Response(serializer.validated_data, status=status.HTTP_200_OK)
#     print("❌ Serializer errors:", serializer.errors)  # DEBUG
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# from rest_framework.authtoken.models import Token
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from django.contrib.auth import authenticate
# from rest_framework import status

# @api_view(['POST'])
# def login_view(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = authenticate(username=username, password=password)

#     if user:
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             "token": token.key,
#             "user": {
#                 "id": user.id,
#                 "username": user.username,
#                 "email": user.email,
#                 "role": user.role
#             }
#         })
#     else:
#         return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)



## VICE PRINCIPAL ##


class VicePrincipalCreateListView(generics.ListCreateAPIView):
    serializer_class = VicePrincipalCreateSerializer
    queryset = VicePrincipal.objects.select_related('userprofile').all()
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [
        parsers.MultiPartParser,
        parsers.FormParser,
        parsers.JSONParser
    ]

    # Custom create
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                vp = serializer.save()
                return Response({
                    "message": "Vice Principal created successfully.",
                    "vp_id": vp.id,
                    "username": vp.userprofile.username,
                    "email": vp.userprofile.email,
                    "phone": vp.phone,
                    "profile_picture": vp.profile_picture.url if vp.profile_picture else None
                }, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {"error": "Username already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Custom list
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = [
            {
                "vp_id": vp.id,
                "username": vp.userprofile.username,
                "email": vp.userprofile.email,
                "phone": vp.phone,
                "profile_picture": vp.profile_picture.url if vp.profile_picture else None
            }
            for vp in queryset
        ]
        return Response(data, status=status.HTTP_200_OK)


class VicePrincipalDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = VicePrincipal.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return VicePrincipalUpdateSerializer
        return VicePrincipalDetailSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except IntegrityError:
                return Response(
                    {"error": "Username already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Vice Principal deleted"}, status=status.HTTP_204_NO_CONTENT)



 
 ## SECTION ##
    
class SectionCreateListView(generics.ListCreateAPIView):
    
    queryset = Section.objects.all()
    
    serializer_class = SectionSerializer
    
    permission_classes = [permissions.IsAuthenticated]
    
class SectionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Section.objects.all()
    
    serializer_class = SectionSerializer
    
    permission_classes = [permissions.IsAuthenticated]
    
    lookup_field = 'id'


## STANDARD ##

class StandardCreateListView(generics.ListCreateAPIView):
    
    queryset = Standard.objects.all()
    
    serializer_class = StandardSerializer
    
    permission_classes = [permissions.IsAuthenticated]

    # def get_serializer_class(self):
        
    #     if self.request.method == 'POST':
            
    #         return StandardSerializer
    #     return super().get_serializer(*args, **kwargs)

    # def perform_create(self, serializer):
        
    #     school_id = self.kwargs['school_id']
        
    #     school = School.objects.get(id=school_id)
        
    #     serializer.save(school=school)

class StandardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Standard.objects.all()
    
    serializer_class = StandardSerializer
    
    permission_classes = [permissions.IsAuthenticated]
    
    lookup_field = 'id'
    
## SUBJECT ##
class SubjectCreateListView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]


# ✅ Retrieve + Update + Delete by id
class SubjectDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    
    
## TEACHERS ##



class TeacherCreateListView(generics.ListCreateAPIView):
    queryset = Teacher.objects.select_related('user').all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TeacherSerializer
        return TeacherDetailSerializer


class TeacherDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Teacher.objects.all()
    serializer_class = TeacherDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'



# class StudentCreateListAPIView(generics.ListCreateAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     permission_classes = [permissions.IsAuthenticated] 
    

# class StudentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     permission_classes = [permissions.IsAuthenticated]  # Adjust as needed
#     lookup_field = 'id'
    
    
    
    
    
# ✅ Hostel CRUD
class HostelListCreateView(generics.ListCreateAPIView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer


class HostelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer


# ✅ Assign hostel to student
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Student, Hostel

class AssignHostelView(APIView):
    def patch(self, request, student_id, hostel_id):
        # Get student
        student = get_object_or_404(Student, id=student_id)

        # Get hostel
        hostel = get_object_or_404(Hostel, id=hostel_id)

        # Check if hostel is full
        current_occupancy = Student.objects.filter(hostel=hostel).count()
        if current_occupancy >= hostel.intake:
            return Response(
                {"error": "Hostel is already full"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Assign hostel to student
        student.hostel = hostel
        student.save()

        # Updated occupancy after assigning
        current_occupancy = Student.objects.filter(hostel=hostel).count()

        return Response({
            "id": student.id,
            "user": student.user.id,
            "roll_no": student.roll_no,
            "hostel": hostel.id,
            "hostel_name": hostel.name,
            "room_number": getattr(student, "room_number", None),
            "current_occupancy": current_occupancy,
            "hostel_capacity": hostel.intake
        }, status=status.HTTP_200_OK)




# ======================================
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



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


# Create a new StaffRole
from rest_framework import generics, permissions
from .models import StaffRole
from .serializer import StaffRoleSerializer

# List & Create
from rest_framework.authentication import TokenAuthentication

class StaffRoleListAPIView(generics.ListCreateAPIView):
    queryset = StaffRole.objects.all()
    serializer_class = StaffRoleSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Retrieve, Update, Delete
class StaffRoleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StaffRole.objects.all()
    serializer_class = StaffRoleSerializer
    permission_classes = [permissions.IsAuthenticated]


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
