
from rest_framework import serializers
from .models import HOD,Faculty,Hostel,Student,CoordinatorsRole
from superadmin_app.models import Department,UserProfile,Course,Semester
from rest_framework.response import Response
from rest_framework import status
from superadmin_app.models import College


        

from rest_framework import serializers
from .models import Course, Department



# serializers.py
from rest_framework import serializers
from .models import CollegeAcademicSelection

class CollegeAcademicSelectionSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    department_name = serializers.CharField(source="department.name", read_only=True)
    semester_number = serializers.CharField(source="semester.number", read_only=True)
    subject_name = serializers.CharField(source="subject.name", read_only=True)

    class Meta:
        model = CollegeAcademicSelection
        fields = [
            "id",
            "college",
            "course",
            "course_name",
            "department",
            "department_name",
            "semester",
            "semester_number",
            "subject",
            "subject_name",
            "created_at",
        ]
        read_only_fields = ["college"]




# serializers.py
from rest_framework import serializers
from .models import Course, Department, Semester, Subject

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'code']

class SemesterSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Semester
        fields = ['id', 'number', 'subjects']

class DepartmentSerializer(serializers.ModelSerializer):
    semesters = SemesterSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ['id', 'name', 'semesters']

class CourseSerializer(serializers.ModelSerializer):
    departments = DepartmentSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'departments']



#HOD CREATION AND LISTING and DUD
class HODCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    is_active = serializers.BooleanField(source='user.is_active', read_only=True)  # ✅ added
    last_login = serializers.DateTimeField(source='user.last_login', read_only=True) # ✅ added

    class Meta:
        model = HOD
        fields = ['username', 'email', 'password', 'phone', 'department','is_active', 'last_login']

    def validate_username(self, value):
        if UserProfile.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_department(self, value):
        request = self.context.get("request")
        institution = getattr(request.user, "institution", None)
        if not institution:
            raise serializers.ValidationError("This user is not linked to any institution")

        college = College.objects.filter(instution_obj=institution).first()
        if college and HOD.objects.filter(department=value, college=college).exists():
            raise serializers.ValidationError("This department already has an HOD assigned in this college.")
        return value

    def create(self, validated_data):
        request = self.context.get("request")

        # Create the user for HOD
        user = UserProfile.objects.create_user(
            username=validated_data.pop("username"),
            email=validated_data.pop("email"),
            password=validated_data.pop("password"),
            role="hod"
        )

        institution = getattr(request.user, "institution", None)
        if not institution:
            raise serializers.ValidationError("This user is not linked to any institution")

        # ✅ Get the college of the principal/admin creating the HOD
        college = College.objects.filter(instution_obj=institution).first()
        if not college:
            raise serializers.ValidationError("No college found for this principal")

        # ✅ Pop department so it's not duplicated in validated_data
        department = validated_data.pop("department")

        # ✅ Create the HOD
        return HOD.objects.create(
            user=user,
            college=college,
            department=department,
            **validated_data
        )


# class HODListSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='user.username')
#     email = serializers.EmailField(source='user.email')
#     department_name = serializers.CharField(source='department.name')
#     college_name = serializers.CharField(source='department.college.college_name', read_only=True)

   

#     class Meta:
#         model = HOD
#         fields = ['id', 'username', 'email', 'phone', 'department_name','college_name']

class HODListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    department_name = serializers.CharField(source='department.name', read_only=True)
    college_name = serializers.SerializerMethodField()
    university_name = serializers.SerializerMethodField()

    class Meta:
        model = HOD
        fields = ['id', 'username', 'email', 'phone', 'department_name', 'college_name', 'university_name']

    def get_college_name(self, obj):
        # Only use HOD.college
        if obj.college:
            return obj.college.college_name
        return None

    def get_university_name(self, obj):
        if obj.college and obj.college.university:
            return obj.college.university.name
        return None


class HODDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = HOD
        fields = ['id', 'username', 'email', 'phone', 'department','department_name']

    


class HODUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(write_only=True, required=False)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = HOD
        fields = ['username', 'email', 'phone', 'password', 'department']

    def update(self, instance, validated_data):
        # Update user model
        user_data = validated_data.pop('user', {})
        username = user_data.get('username')
        email = user_data.get('email')
        password = validated_data.pop('password', None)

        if username:
            instance.user.username = username
        if email:
            instance.user.email = email
        if password:
            instance.user.set_password(password)

        instance.user.save()

        # Update HOD fields
        instance.phone = validated_data.get('phone', instance.phone)
        instance.department = validated_data.get('department', instance.department)
        instance.save()

        return instance

# FACULTY CREATION  LISTING and DUD
class FacultyCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Faculty
        fields = ['username', 'email', 'password', 'phone', 'department']

    def validate_username(self, value):
        if UserProfile.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role='faculty'  # 👈 if you're using role-based user model
        )

        return Faculty.objects.create(user=user, **validated_data)


class FacultyListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    department_name = serializers.CharField(source='department.name')
   

    class Meta:
        model = Faculty
        fields = ['id', 'username', 'email', 'phone', 'department_name']

class FacultyDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    department_name = serializers.CharField(source='department.name')

    class Meta:
        model = HOD
        fields = ['id', 'username', 'email', 'phone', 'department','department_name']



class FacultyUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(write_only=True, required=False)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = HOD
        fields = ['username', 'email', 'phone', 'password', 'department']

    def update(self, instance, validated_data):
        # Update user model
        user_data = validated_data.pop('user', {})
        username = user_data.get('username')
        email = user_data.get('email')
        password = validated_data.pop('password', None)

        if username:
            instance.user.username = username
        if email:
            instance.user.email = email
        if password:
            instance.user.set_password(password)

        instance.user.save()

        # Update HOD fields
        instance.phone = validated_data.get('phone', instance.phone)
        instance.department = validated_data.get('department', instance.department)
        instance.save()

        return instance



# serializers.py
from rest_framework import serializers
from .models import FacultySubjectAssignment, Faculty, HOD
from superadmin_app.models import Subject, Semester

class FacultySubjectAssignmentSerializer(serializers.ModelSerializer):
    faculty_id = serializers.PrimaryKeyRelatedField(queryset=Faculty.objects.all(), source="faculty", write_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), source="subject", write_only=True)
    semester_id = serializers.PrimaryKeyRelatedField(queryset=Semester.objects.all(), source="semester", write_only=True)

    faculty_name = serializers.CharField(source="faculty.user.username", read_only=True)
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    semester_number = serializers.CharField(source="semester.number", read_only=True)

    class Meta:
        model = FacultySubjectAssignment
        fields = [
            "id",
            "faculty_id", "subject_id", "semester_id",
            "faculty_name", "subject_name", "semester_number",
            "created_at",
        ]

    def validate(self, data):
        request = self.context.get("request")
        hod = HOD.objects.filter(user=request.user).first()

        if not hod:
            raise serializers.ValidationError("Only HODs can assign subjects.")

        # ensure faculty belongs to HOD’s department
        if data["faculty"].department != hod.department:
            raise serializers.ValidationError("This faculty is not in your department.")

        # ensure subject belongs to HOD’s department
        if data["subject"].semester.department != hod.department:
            raise serializers.ValidationError("This subject is not in your department.")

        # ensure semester belongs to HOD’s department
        if data["semester"].department != hod.department:
            raise serializers.ValidationError("This semester is not in your department.")

        return data

    def create(self, validated_data):
        request = self.context.get("request")
        hod = HOD.objects.filter(user=request.user).first()
        return FacultySubjectAssignment.objects.create(assigned_by=hod, **validated_data)

#HOSTEL CREATION LISTING

class HostelSerializer(serializers.ModelSerializer):
    current_occupancy = serializers.SerializerMethodField()

    class Meta:
        model = Hostel
        fields = ['id', 'name', 'hostel_type', 'intake', 'address', 'current_occupancy']

    def get_current_occupancy(self, obj):
        return Student.objects.filter(hostel=obj).count()


class StudentHostelSerializer(serializers.ModelSerializer):
    hostel_name = serializers.CharField(source='hostel.name', read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'user', 'roll_no', 'hostel', 'hostel_name', 'room_number']



# STUDENT CREATION LISTING 
class StudentCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    semester = serializers.PrimaryKeyRelatedField(queryset=Semester.objects.all())
    photo = serializers.ImageField(required=False,allow_null=True)

    class Meta:
        model = Student
        fields = [
            'username', 'email', 'password',
            'phone', 'roll_no', 'course', 'department',
            'semester', 'address', 'photo','gender'
        ]

    def validate_username(self, value):
        if UserProfile.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        # Create linked UserProfile
        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role='student'
        )

        return Student.objects.create(user=user, **validated_data)







# STUDENT LIST
class StudentListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    course_name = serializers.CharField(source='course.name')
    department_name = serializers.CharField(source='department.name')
    
   
    semester_name = serializers.CharField(source='semester.number', read_only=True)

    # photo = serializers.ImageField(use_url=True)
    photo = serializers.ImageField(required=False,allow_null=True)

    class Meta:
        model = Student
        fields = [
            'id', 'username', 'email', 'phone', 'roll_no',
            'course_name', 'department_name', 'semester_name',
            'address', 'photo','gender'
        ]


# STUDENT DETAIL
class StudentDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    photo = serializers.ImageField(required=False, use_url=True)
    course_name = serializers.CharField(source='course.name')
    department_name = serializers.CharField(source='department.name')
    

    class Meta:
        model = Student
        fields = [
            'id', 'username', 'email', 'phone', 'roll_no',
            'course_name', 'department_name', 'semester', 'address', 'photo','gender'
        ]


# STUDENT UPDATE
class StudentUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(write_only=True, required=False)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    semester = serializers.PrimaryKeyRelatedField(queryset=Semester.objects.all())
    photo = serializers.ImageField(required=False,allow_null=True)

    class Meta:
        model = Student
        fields = [
            'username', 'email', 'phone', 'roll_no',
            'password', 'course', 'department', 'semester',
            'address', 'photo','gender'
        ]

    def update(self, instance, validated_data):
        # Update UserProfile
        user_data = validated_data.pop('user', {})
        username = user_data.get('username')
        email = user_data.get('email')
        password = validated_data.pop('password', None)

        if username:
            instance.user.username = username
        if email:
            instance.user.email = email
        if password:
            instance.user.set_password(password)

        instance.user.save()

        # Update Student fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


#COORDINATOR CREATING LISTING

class CoordinatorsRoleSerializer(serializers.ModelSerializer):
    # Write-only for creation
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    # Read-only for listing
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    user_username = serializers.CharField(source="user.username", read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = CoordinatorsRole
        fields = [
            "id",
            "username", "email", "password",  # creation fields
            "user_id", "user_username", "user_email",  # listing fields
            "coordinators_role",
            "can_access_library",
            "can_access_exam",
            "can_access_finance",
            "can_access_placement",
            "can_access_sports",
            "can_access_lab",
            "can_access_hostel",
        ]

    def create(self, validated_data):
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        role = validated_data.get("coordinators_role")

        # Auto-set permissions based on role
        role_permission_map = {
            "librarian": "can_access_library",
            "controller_of_exam": "can_access_exam",
            "finance_officer": "can_access_finance",
            "placement_officer": "can_access_placement",
            "sports_coordinator": "can_access_sports",
            "lab_coordinator": "can_access_lab",
            "hostel_manager": "can_access_hostel",
        }

        if role in role_permission_map:
            validated_data[role_permission_map[role]] = True

        # Create user account with role
        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=role  # This assumes UserProfile has a 'role' field
        )

        # Create coordinator role
        return CoordinatorsRole.objects.create(user=user, **validated_data)

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CoordinatorsRole

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]

# class CoordinatorsRoleSerializer(serializers.ModelSerializer):
#     # Nest user details
#     user = UserSerializer()

#     class Meta:
#         model = CoordinatorsRole
#         fields = [
#             "id",
#             "user",
#             "coordinators_role",
#             "can_access_library",
#             "can_access_exam",
#             "can_access_finance",
#             "can_access_transport",
#             "can_access_arts_sports",
#             "can_access_lab",
#             "can_access_hostel",
#         ]

#     def create(self, validated_data):
#         user_data = validated_data.pop("user")
#         user = User.objects.create(**user_data)  # creates the linked user
#         coordinator_role = CoordinatorsRole.objects.create(user=user, **validated_data)
#         return coordinator_role

#     def update(self, instance, validated_data):
#         user_data = validated_data.pop("user", None)
#         if user_data:
#             # update user details
#             for attr, value in user_data.items():
#                 setattr(instance.user, attr, value)
#             instance.user.save()

#         # update coordinator role fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#         return instance



# library_app/serializers.py
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'



#BUS 
from rest_framework import serializers
from .models import Bus, BusStop, StudentBusAllocation
from .models import Student  # adjust path if needed

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'


class BusStopSerializer(serializers.ModelSerializer):
    bus_number = serializers.CharField(source='bus.bus_number', read_only=True)

    class Meta:
        model = BusStop
        fields = ['id', 'bus', 'bus_number', 'stop_name', 'arrival_time']


# class StudentBusAllocationSerializer(serializers.ModelSerializer):
#     student_name = serializers.CharField(source='student.user.username', read_only=True)
#     roll_no = serializers.CharField(source='student.roll_no', read_only=True)
#     bus_details = BusSerializer(source='bus', read_only=True)
#     stop_details = BusStopSerializer(source='stop', read_only=True)

#     class Meta:
#         model = StudentBusAllocation
#         fields = ['id', 'student', 'student_name', 'roll_no', 'bus', 'bus_details', 'stop', 'stop_details']



class StudentBusAllocationSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.username', read_only=True)
    roll_no = serializers.CharField(source='student.roll_no', read_only=True)
    bus_details = BusSerializer(source='bus', read_only=True)
    stop_details = BusStopSerializer(source='stop', read_only=True)

    class Meta:
        model = StudentBusAllocation
        fields = ['id', 'student', 'student_name', 'roll_no', 'bus', 'bus_details', 'stop', 'stop_details']





from rest_framework import serializers
from .models import Event
from .models import Student



class StudentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Student
        fields = ["id", "username", "email"]


class FacultySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Faculty
        fields = ["id", "username", "email"]


class HODSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = HOD
        fields = ["id", "username", "email"]



class EventSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)
    faculties = FacultySerializer(many=True, read_only=True)
    hods = HODSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "start_date",
            "end_date",
            "students",
            "faculties",
            "hods",
            "created_at",
        ]
        read_only_fields = ["created_at"]



from rest_framework import serializers
from .models import HODAttendance, HOD

class HODAttendanceSerializer(serializers.ModelSerializer):
    hod_name = serializers.CharField(source='hod.username', read_only=True)
    department_name = serializers.SerializerMethodField()

    class Meta:
        model = HODAttendance
        fields = ['id', 'hod', 'hod_name', 'date', 'status', 'remarks', 'department_name']
        read_only_fields = ['hod', 'date', 'department_name']

    def get_department_name(self, obj):
        try:
            # Get department name from HOD object
            hod_obj = HOD.objects.get(user=obj.hod)
            return hod_obj.department.name
        except HOD.DoesNotExist:
            return None
