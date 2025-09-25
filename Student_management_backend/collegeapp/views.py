
from rest_framework import generics,status
from .models import HOD,Faculty
from rest_framework.permissions import IsAuthenticated
from .serializer import HODCreateSerializer,HODListSerializer,HODDetailSerializer,HODUpdateSerializer,FacultyCreateSerializer,FacultyListSerializer,FacultyUpdateSerializer,FacultyDetailSerializer,StudentUpdateSerializer,StudentDetailSerializer,StudentCreateSerializer,StudentListSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from superadmin_app.models import College


from rest_framework import generics, permissions


# views.py
from rest_framework import generics, permissions, authentication
from .models import CollegeAcademicSelection
from .serializer import CollegeAcademicSelectionSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CollegeAcademicSelection, College
from .serializer import CollegeAcademicSelectionSerializer

class CollegeAcademicSelectionListCreateView(APIView):
    def get(self, request):
        user = request.user  

        # if the user is a college principal
        if hasattr(user, "institution"):  
            # get the college linked with this institution
            college = College.objects.filter(instution_obj=user.institution).first()
            if not college:
                return Response({"error": "No college found for this principal"}, status=404)

            selections = CollegeAcademicSelection.objects.filter(college=college)
            serializer = CollegeAcademicSelectionSerializer(selections, many=True)
            return Response(serializer.data)

        return Response({"error": "User is not linked to a college"}, status=400)



# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Course
from .serializer import CourseSerializer


# ✅ List all courses (with nested departments, semesters, subjects)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Course
from .serializer import CourseSerializer
from superadmin_app.models import College  # adjust path


class CourseListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        courses = Course.objects.none()  # default empty queryset

        # HOD → only courses of their college's university
        if hasattr(user, "hod"):
            college = user.hod.college
            if college and college.university:
                courses = Course.objects.filter(university=college.university)

        # Institution admin / principal / superadmin
        elif user.role in ["institution_admin", "staff", "superadmin"]:
            if hasattr(user, "institution"):
                colleges = College.objects.filter(instution_obj=user.institution)
                courses = Course.objects.filter(university__colleges__in=colleges).distinct()

        # If no courses found
        if not courses.exists():
            return Response({"error": "No courses found for this user"}, status=404)

        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class CourseDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user
        college = None

        # 1️⃣ Check if user is HOD
        if hasattr(user, "hod"):
            college = user.hod.college

        # 2️⃣ Check if user is principal/admin
        elif hasattr(user, "institution"):
            college = College.objects.filter(instution_obj=user.institution).first()

        if not college:
            return Response({"error": "No college assigned to this user"}, status=400)

        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=404)

        # Here you can serialize and count departments/subjects
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Course, CollegeAcademicSelection
from superadmin_app.models import College

class SelectedCourseCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Find the college of the logged-in user
        college = None
        if hasattr(user, "hod"):
            college = user.hod.college
        elif hasattr(user, "institution"):
            college = College.objects.filter(instution_obj=user.institution).first()

        if not college:
            return Response({"error": "No college assigned to this user"}, status=400)

        # Count only courses allowed via CollegeAcademicSelection
        selected_courses = Course.objects.filter(college_academic_selections__college=college).distinct()
        return Response({"total_courses": selected_courses.count()})


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Course, Department, CollegeAcademicSelection, HOD
from .serializer import CourseSerializer, HODCreateSerializer, HODListSerializer
from superadmin_app.models import College


# ✅ Get all courses allowed for this college (via CollegeAcademicSelection)
class SelectedCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        college = College.objects.filter(instution_obj=user.institution).first()

        if not college:
            return Response({"error": "No college linked to this user"}, status=400)

        # 🎓 Get only courses allowed by selection
        selected_courses = Course.objects.filter(
            college_academic_selections__college=college
        ).prefetch_related("departments__semesters__subjects").distinct()

        serializer = CourseSerializer(selected_courses, many=True)
        return Response(serializer.data)


# ✅ Get departments of a selected course (filtered by the college’s selection)
class SelectedDepartmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        user = request.user
        college = College.objects.filter(instution_obj=user.institution).first()

        if not college:
            return Response({"error": "No college linked to this user"}, status=400)

        # 🔒 Check if this course is allowed for this college
        if not CollegeAcademicSelection.objects.filter(college=college, course_id=course_id).exists():
            return Response({"error": "This course is not allowed for your college"}, status=403)

        # ✅ Get departments under this course
        departments = Department.objects.filter(course_id=course_id)
        data = [{"id": d.id, "name": d.name} for d in departments]
        return Response(data)



from rest_framework import generics, permissions

class CollegeAcademicSelectionCreateView(generics.ListCreateAPIView):
    serializer_class = CollegeAcademicSelectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CollegeAcademicSelection.objects.filter(college=self.request.user.college)

    def perform_create(self, serializer):
        serializer.save(college=self.request.user.college)






class HODListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return HODCreateSerializer if self.request.method == 'POST' else HODListSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        return HOD.objects.filter(college__instution_obj=self.request.user.institution)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        hod = serializer.save()  # ✅ college handled inside serializer

        return Response({
            "message": "HOD created successfully.",
            "hod_id": hod.id,
            "username": hod.user.username,
            "college_name": hod.college.college_name
        }, status=status.HTTP_201_CREATED)


class HODDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HOD.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return HODUpdateSerializer
        return HODDetailSerializer





class FacultyListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # HOD: only their department
        if hasattr(user, "hod"):
            return Faculty.objects.filter(department=user.hod.department)

        # College admin or superadmin
        if user.role in ["institution_admin", "staff", "superadmin"]:
            if hasattr(user, "institution"):
                # Get all colleges under this institution
                colleges = College.objects.filter(instution_obj=user.institution)
                
                # Get all courses under these colleges
                courses = Course.objects.filter(university__colleges__in=colleges).distinct()

                # Get all departments under these courses
                departments = Department.objects.filter(course__in=courses)

                # Get all faculties under these departments
                return Faculty.objects.filter(department__in=departments)

        # Default: empty
        return Faculty.objects.none()

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
    


# views.py
from rest_framework import generics, permissions,authentication
from .models import FacultySubjectAssignment, HOD
from .serializer import FacultySubjectAssignmentSerializer
from superadmin_app.serializer import SemesterSerializer
from superadmin_app.models import Semester

class FacultySubjectAssignmentView(generics.ListCreateAPIView):
    serializer_class = FacultySubjectAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        hod = HOD.objects.filter(user=self.request.user).first()
        if not hod:
            return FacultySubjectAssignment.objects.none()
        return FacultySubjectAssignment.objects.filter(assigned_by=hod)
    
    def get_serializer_context(self):
        return {"request": self.request}
    



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


# from rest_framework import generics, status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Student
# from .serializer import StudentCreateSerializer, StudentListSerializer, StudentDetailSerializer, StudentUpdateSerializer
# from rest_framework.views import APIView 
# class StudentListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Student.objects.all()
#     permission_classes = [IsAuthenticated]

#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return StudentCreateSerializer
#         return StudentListSerializer

#     def get_serializer_context(self):
#         return {'request': self.request}

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)

#         if serializer.is_valid():
#             student = serializer.save()
#             return Response({
#                 "message": "Student created successfully.",
#                 "student_id": student.id,
#                 "username": student.user.username
#             }, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from .models import Student
from collegeapp.models import HOD  # adjust import if needed

# class StudentListCreateAPIView(generics.ListCreateAPIView):
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         # If user is a HOD → filter by their department
#         if hasattr(user, "hod"):  # assuming UserProfile ↔ HOD relation
#             return Student.objects.filter(department=user.hod.department)
#         # If not a HOD (like admin) → show all students
#         return Student.objects.all()

#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return StudentCreateSerializer
#         return StudentListSerializer

#     def get_serializer_context(self):
#         return {'request': self.request}

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             student = serializer.save()
#             return Response({
#                 "message": "Student created successfully.",
#                 "student_id": student.id,
#                 "username": student.user.username
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StudentListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # HOD → only their department’s students
        if hasattr(user, "hod"):
            return Student.objects.filter(department=user.hod.department)

        # Institution Admin / Staff / Superadmin → all students under their institution
        if user.role in ["institution_admin", "staff", "superadmin"]:
            if hasattr(user, "institution"):
                return Student.objects.filter(
                    department__course__university__colleges__instution_obj=user.institution
                ).distinct()

        # Default → none
        return Student.objects.none()

    def get_serializer_class(self):
        return StudentCreateSerializer if self.request.method == 'POST' else StudentListSerializer

    def get_serializer_context(self):
        return {"request": self.request}

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        student = serializer.save()

        return Response({
            "message": "Student created successfully.",
            "student_id": student.id,
            "username": student.user.username,
            "department": student.department.name,
        }, status=status.HTTP_201_CREATED)



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





class CoordinatorsRoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CoordinatorsRole.objects.select_related("user").all()
    serializer_class = CoordinatorsRoleSerializer
    permission_classes = [IsAuthenticated]

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
#         event = serializer.save(college=college, created_by=user)

#         send_to = self.request.data.get("send_to")

#         if send_to == "all":
#             event.students.set(Student.objects.filter(course__university=college.university))
#             event.faculties.set(Faculty.objects.filter(department__course__university=college.university))
#             event.hods.set(HOD.objects.filter(department__course__university=college.university))

#         elif send_to == "students":
#             event.students.set(Student.objects.filter(course__university=college.university))

#         elif send_to == "faculties":
#             event.faculties.set(Faculty.objects.filter(department__course__university=college.university))

#         elif send_to == "hods":
#             event.hods.set(HOD.objects.filter(department__course__university=college.university))
        

    

# views.py
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Event, College, Student, Faculty, HOD
from .serializer import EventSerializer

class EventListCreateView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Principal / Institution Admin: all events of their college
        if user.role == "institution_admin":
            college = College.objects.filter(instution_obj=user.institution).first()
            if college:
                return Event.objects.filter(college=college).order_by("-start_date")
            return Event.objects.none()

        # HOD: events assigned to them
        elif user.role == "hod":
            hod_obj = HOD.objects.filter(user=user).first()
            if hod_obj:
                return Event.objects.filter(hods=hod_obj).order_by("-start_date")
            return Event.objects.none()

        # Faculty: events assigned to them
        elif user.role == "faculty":
            faculty_obj = Faculty.objects.filter(user=user).first()
            if faculty_obj:
                return Event.objects.filter(faculties=faculty_obj).order_by("-start_date")
            return Event.objects.none()

        # Student: events assigned to them
        elif user.role == "students":
            student_obj = Student.objects.filter(user=user).first()
            if student_obj:
                return Event.objects.filter(students=student_obj).order_by("-start_date")
            return Event.objects.none()

        return Event.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "institution_admin":
            raise PermissionDenied("Only institution admin can create events")

        college = College.objects.filter(instution_obj=user.institution).first()
        event = serializer.save(college=college, created_by=user)

        send_to = self.request.data.get("send_to")

        # Assign to appropriate users based on the same university
        university = college.university

        if send_to == "all":
            event.students.set(Student.objects.filter(course__university=university))
            event.faculties.set(Faculty.objects.filter(department__course__university=university))
            event.hods.set(HOD.objects.filter(department__course__university=university))
        elif send_to == "students":
            event.students.set(Student.objects.filter(course__university=university))
        elif send_to == "faculties":
            event.faculties.set(Faculty.objects.filter(department__course__university=university))
        elif send_to == "hods":
            event.hods.set(HOD.objects.filter(department__course__university=university))

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




# from rest_framework import generics, permissions
# from .models import HODAttendance
# from .serializer import HODAttendanceSerializer
# from rest_framework.exceptions import PermissionDenied


# class HODAttendanceListCreateView(generics.ListCreateAPIView):
#     serializer_class = HODAttendanceSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user

#         if user.role == "institution_admin":  
#             # Principal/Admin → see all HODs' attendance
#             return HODAttendance.objects.all()
#         elif user.role == "hod":
#             # HOD → see only their own attendance
#             return HODAttendance.objects.filter(hod=user)
#         else:
#             # Others → no access (empty queryset)
#             return HODAttendance.objects.none()

#     def perform_create(self, serializer):
#         # Only HODs can mark their own attendance
#         if self.request.user.role == "hod":
#             serializer.save(hod=self.request.user)
#         else:
#             raise PermissionDenied("Only HODs can mark attendance")


from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import HODAttendance, HOD
from .serializer import HODAttendanceSerializer

class HODAttendanceListCreateView(generics.ListCreateAPIView):
    serializer_class = HODAttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "institution_admin":
            # Get all HODs under this institution
            hods = HOD.objects.filter(college__instution_obj__user_object=user)
            # Filter attendance for those HODs
            return HODAttendance.objects.filter(hod__in=hods.values_list('user', flat=True))
        
        elif user.role == "hod":
            # HOD → see only their own attendance
            return HODAttendance.objects.filter(hod=user)
        
        else:
            # Others → no access
            return HODAttendance.objects.none()

    def perform_create(self, serializer):
        # Only HODs can mark their own attendance
        if self.request.user.role == "hod":
            serializer.save(hod=self.request.user)
        else:
            raise PermissionDenied("Only HODs can mark attendance")
