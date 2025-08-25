
from rest_framework import generics,status
from .models import HOD,Faculty
from rest_framework.permissions import IsAuthenticated
from .serializer import HODCreateSerializer,HODListSerializer,HODDetailSerializer,HODUpdateSerializer,FacultyCreateSerializer,FacultyListSerializer,FacultyUpdateSerializer,FacultyDetailSerializer,StudentUpdateSerializer,StudentDetailSerializer,StudentCreateSerializer,StudentListSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from superadmin_app.models import College


from rest_framework import generics, permissions
from .models import CollegeCourse, CollegeDepartment, Course, Department
from .serializer import CollegeCourseSerializer, CollegeDepartmentSerializer

# CollegeCourse: Principal assigns a Course to their College
# from rest_framework.exceptions import ValidationError

# class CollegeCourseListCreateView(generics.ListCreateAPIView):
#     serializer_class = CollegeCourseSerializer
#     queryset = CollegeCourse.objects.all()

#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context['request'] = self.request
#         return context

#     def perform_create(self, serializer):
#         institution = self.request.user.institution
#         college = College.objects.filter(instution_obj=institution).first()
#         if not college:
#             raise ValidationError("No college found for this institution.")
#         serializer.save(college=college)




# # CollegeDepartment: Principal assigns a Department under a Course for their College
# class CollegeDepartmentListCreateView(generics.ListCreateAPIView):
#     serializer_class = CollegeDepartmentSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         institution = self.request.user.institution
#         college = College.objects.filter(instution_obj=institution).first()
#         if not college:
#             return CollegeDepartment.objects.none()
#         return CollegeDepartment.objects.filter(college_course__college=college)

#     def perform_create(self, serializer):
#         institution = self.request.user.institution
#         college = College.objects.filter(instution_obj=institution).first()
#         if not college:
#             raise ValidationError("No college found for this institution.")

#         college_course = serializer.validated_data.get("college_course")
#         if not college_course or college_course.college != college:
#             raise ValidationError("Invalid course: you can only add departments under your own college’s courses.")

#         serializer.save()

from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from .models import CollegeCourse, CollegeDepartment
from .serializer import CollegeCourseSerializer, CollegeDepartmentSerializer
from superadmin_app.models import College


# CollegeCourse: Principal assigns a Course to their College
class CollegeCourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CollegeCourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        institution = self.request.user.institution
        college = College.objects.filter(instution_obj=institution).first()
        if not college:
            return CollegeCourse.objects.none()
        # ✅ Fetch related course + university
        return (
            CollegeCourse.objects.filter(college=college)
            .select_related("course", "course__university")
        )



# CollegeDepartment: Principal assigns a Department under a Course for their College
class CollegeDepartmentListCreateView(generics.ListCreateAPIView):
    serializer_class = CollegeDepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        institution = self.request.user.institution
        college = College.objects.filter(instution_obj=institution).first()
        if not college:
            return CollegeDepartment.objects.none()
        # ✅ Fetch related course, university, department
        return (
            CollegeDepartment.objects.filter(college_course__college=college)
            .select_related("college_course__course", "college_course__course__university", "department")
        )




from rest_framework import generics, permissions
from superadmin_app.models import Course, Department, College
from .serializer import CourseSerializer, DepartmentSerializer


# ✅ Get all courses from the logged-in user's university
class AvailableCourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        college = College.objects.filter(instution_obj=user.institution).first()
        if not college:
            return Course.objects.none()

        # ✅ Now get university from college
        university = college.university
        return Course.objects.filter(university=university)


# ✅ Get all departments under a course from the user's university
class AvailableDepartmentListView(generics.ListAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        college = College.objects.filter(instution_obj=user.institution).first()
        if not college:
            return Department.objects.none()

        university = college.university
        return Department.objects.filter(course__university=university)


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
        print("Received data:", request.data)


        if serializer.is_valid():
            hod = serializer.save()
            return Response({
                "message": "HOD created successfully.",
                "hod_id": hod.id,
                "username": hod.user.username,
                "college_name":hod.department.college.college_name
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HODDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HOD.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return HODUpdateSerializer
        return HODDetailSerializer




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
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return FacultyUpdateSerializer
        return FacultyDetailSerializer
    

#HOSTEL 
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Hostel, Student
from .serializer import HostelSerializer, StudentHostelSerializer

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


from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Student
from .serializer import StudentCreateSerializer, StudentListSerializer, StudentDetailSerializer, StudentUpdateSerializer
from rest_framework.views import APIView 
class StudentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return StudentCreateSerializer
        return StudentListSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            student = serializer.save()
            return Response({
                "message": "Student created successfully.",
                "student_id": student.id,
                "username": student.user.username
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return StudentUpdateSerializer
        return StudentDetailSerializer
    





#bulk

import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .serializer import StudentCreateSerializer

class StudentBulkUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Read Excel file into DataFrame
            df = pd.read_excel(excel_file)
        except Exception as e:
            return Response({"error": f"Failed to read Excel file: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        # Expected columns in Excel file (make sure these match your Excel headers exactly)
        expected_columns = [
            'username', 'email', 'password',
            'phone', 'roll_no', 'course', 'department',
            'semester', 'address', 'photo','gender' # photo can be left blank or handled separately
        ]

        for col in expected_columns:
            if col not in df.columns:
                return Response({"error": f"Missing required column: {col}"}, status=status.HTTP_400_BAD_REQUEST)

        success_count = 0
        errors = []

        for index, row in df.iterrows():
            # Prepare data dict for serializer
            data = row.to_dict()

            # If photo upload from excel is not feasible, you can skip or set None
            if pd.isna(data.get('photo')):
                data['photo'] = None

            serializer = StudentCreateSerializer(data=data)

            if serializer.is_valid():
                try:
                    with transaction.atomic():
                        serializer.save()
                    success_count += 1
                except Exception as e:
                    errors.append({"row": index + 2, "error": str(e)})  # +2 for header and 0-index
            else:
                errors.append({"row": index + 2, "error": serializer.errors})

        return Response({
            "message": f"{success_count} students created successfully.",
            "errors": errors
        }, status=status.HTTP_201_CREATED if success_count > 0 else status.HTTP_400_BAD_REQUEST)




# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CoordinatorsRole
from .serializer import CoordinatorsRoleSerializer

class CoordinatorsRoleListCreateView(APIView):
    permission_classes = [IsAuthenticated]  # adjust if needed

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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# library_app/views.py
from rest_framework import generics, permissions
from .models import Book
from .serializer import BookSerializer

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]  # Token auth

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]




# views.py
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializer

class BulkBookUploadView(APIView):
    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = pd.read_excel(file)
        except Exception as e:
            return Response({"error": f"Invalid file format: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        errors = []
        success_count = 0

        for idx, row in df.iterrows():
            book_data = {
                "title": row.get("title"),
                "author": row.get("author"),
                "isbn": str(row.get("isbn")),
                "category": row.get("category"),
                "quantity": int(row.get("quantity", 1)),
            }

            serializer = BookSerializer(data=book_data)
            if serializer.is_valid():
                serializer.save()
                success_count += 1
            else:
                errors.append({
                    "row": idx + 2,  # +2 because Excel index starts at 0 and 1st row is header
                    "error": serializer.errors
                })

        return Response({
            "message": f"{success_count} books uploaded successfully.",
            "errors": errors
        }, status=status.HTTP_200_OK)




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


# ---------- Student's own bus ----------
class MyBusAPIView(generics.RetrieveAPIView):
    serializer_class = StudentBusAllocationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return StudentBusAllocation.objects.select_related('bus', 'stop').get(student=self.request.user.student)





# events/views.py
# from rest_framework import generics, permissions
# from .models import Event
# from .serializer import EventSerializer
# from .permissions import IsPrincipal



# class EventListCreateView(generics.ListCreateAPIView):
#     serializer_class = EventSerializer
#     permission_classes = [permissions.IsAuthenticated, IsPrincipal]

#     def get_queryset(self):
#         user = self.request.user
#         college = College.objects.filter(instution_obj=user.institution).first()
#         if college:
#             return Event.objects.filter(college=college).order_by("-id")
#         return Event.objects.none()

#     def perform_create(self, serializer):
#         user = self.request.user
#         college = College.objects.filter(instution_obj=user.institution).first()
#         serializer.save(college=college, created_by=user)


   
from rest_framework import generics, permissions
from .models import Event, College, Student, Faculty, HOD
from .serializer import EventSerializer
from .permissions import IsPrincipal

class EventListCreateView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated, IsPrincipal]

    def get_queryset(self):
        user = self.request.user
        college = College.objects.filter(instution_obj=user.institution).first()
        if college:
            return Event.objects.filter(college=college).order_by("-id")
        return Event.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        college = College.objects.filter(instution_obj=user.institution).first()
        event = serializer.save(college=college, created_by=user)

        send_to = self.request.data.get("send_to")

        if send_to == "all":
            event.students.set(Student.objects.filter(course__university=college.university))
            event.faculties.set(Faculty.objects.filter(department__course__university=college.university))
            event.hods.set(HOD.objects.filter(department__course__university=college.university))

        elif send_to == "students":
            event.students.set(Student.objects.filter(course__university=college.university))

        elif send_to == "faculties":
            event.faculties.set(Faculty.objects.filter(department__course__university=college.university))

        elif send_to == "hods":
            event.hods.set(HOD.objects.filter(department__course__university=college.university))
        

    


# hod/views.py
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework import status

@api_view(['POST'])
def login_view(request):
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
