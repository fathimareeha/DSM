from django.db import models
from rest_framework import generics, permissions,status,parsers
from .models import VicePrincipal,Subject,Standard,Section,Teacher,Student,Book
from .serializer import VicePrincipalCreateSerializer,VicePrincipalDetailSerializer,VicePrincipalUpdateSerializer,SubjectSerializer,StandardSerializer,SectionSerializer,TeacherSerializer,TeacherDetailSerializer,BookSerializer,BookDetailSerializer,StudentCreateSerializer,StudentDetailSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError

## VICE PRINCIPAL ##





class VicePrincipalCreateListView(generics.ListCreateAPIView):
    serializer_class = VicePrincipalCreateSerializer  
    queryset = VicePrincipal.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]  # ✅ Allow images + JSON

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("Received data:", request.data)

        if serializer.is_valid():
            try:
                vp = serializer.save()
                return Response({
                    "message": "Vice Principal created successfully.",
                    "vp_id": vp.id,
                    "username": vp.userprofile.username,  # ✅ directly from UserProfile
                    "email":vp.userprofile.email,
                    "phone":vp.phone,
                    "profile_picture":vp.profile_picture.url if vp.profile_picture else None
                }, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {"error": "Username already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

        # Use partial updates to allow missing fields
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
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import CoordinatorsRole
from .serializer import CoordinatorsRoleSerializer


class CoordinatorsRoleListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # remove if you want public access

    def get(self, request):
        coordinators = CoordinatorsRole.objects.select_related("user").all()
        serializer = CoordinatorsRoleSerializer(coordinators, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoordinatorsRoleSerializer(data=request.data)
        if serializer.is_valid():
            coordinator = serializer.save()
            return Response({
                "message": "Coordinator account created successfully",
                "data": CoordinatorsRoleSerializer(coordinator).data
            }, status=status.HTTP_201_CREATED)

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CoordinatorsRoleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(CoordinatorsRole, pk=pk)

    def get(self, request, pk):
        coordinator = self.get_object(pk)
        serializer = CoordinatorsRoleSerializer(coordinator)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        coordinator = self.get_object(pk)
        serializer = CoordinatorsRoleSerializer(coordinator, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Coordinator updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        coordinator = self.get_object(pk)
        serializer = CoordinatorsRoleSerializer(coordinator, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Coordinator partially updated",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        coordinator = self.get_object(pk)
        coordinator.user.delete()  # also deletes linked user
        coordinator.delete()
        return Response({"message": "Coordinator deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
