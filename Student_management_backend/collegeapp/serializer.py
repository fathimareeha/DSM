
from rest_framework import serializers
from .models import HOD,Faculty,Hostel,Student,CoordinatorsRole
from superadmin_app.models import Department,UserProfile,Course,Semester,College
from rest_framework.response import Response
from rest_framework import status


# from rest_framework import serializers
# from .models import CollegeCourse, CollegeDepartment, Course, Department


# class CollegeCourseSerializer(serializers.ModelSerializer):
#     university_name = serializers.SerializerMethodField()
#     course_name = serializers.CharField(source='course.name', read_only=True)

#     class Meta:
#         model = CollegeCourse
#         fields = ['id', 'course', 'course_name', 'university_name','college']

#     def create(self, validated_data):
#         request = self.context.get('request')
#         user = request.user
#         # Get the principal’s college
#         college = College.objects.filter(instution_obj=user.institution).first()
#         validated_data['college'] = college
#         return super().create(validated_data)

#     def get_university_name(self, obj):
#         return obj.college.university.name if obj.college and obj.college.university else None



# class CollegeDepartmentSerializer(serializers.ModelSerializer):
    
#     department_name = serializers.CharField(source="department.name", read_only=True)
#     course_name = serializers.CharField(source="college_course.course.name", read_only=True)

#     class Meta:
#         model = CollegeDepartment
#         fields = ["id", "college_course", "department", "department_name", "course_name"]
#         extra_kwargs = {
#             "college_course": {"write_only": True}
#         }
        

from rest_framework import serializers
from .models import CollegeCourse, CollegeDepartment, Course, Department


# class CollegeCourseSerializer(serializers.ModelSerializer):
#     university_name = serializers.SerializerMethodField()
#     course_name = serializers.CharField(source='course.name', read_only=True)

#     class Meta:
#         model = CollegeCourse
#         fields = ['id', 'course', 'course_name', 'university_name', 'college']

#     def create(self, validated_data):
#         request = self.context.get('request')
#         user = request.user
#         # Get the principal’s college
#         college = College.objects.filter(instution_obj=user.institution).first()
#         validated_data['college'] = college
#         return super().create(validated_data)

#     def get_university_name(self, obj):
#         # Assuming Course has a ForeignKey to University
#         return obj.course.university.name if obj.course and obj.course.university else None


# class CollegeDepartmentSerializer(serializers.ModelSerializer):
#     department_name = serializers.CharField(source="department.name", read_only=True)
#     course_name = serializers.CharField(source="college_course.course.name", read_only=True)
#     university_name = serializers.SerializerMethodField()

#     class Meta:
#         model = CollegeDepartment
#         fields = ["id", "college_course", "department", "department_name", "course_name", "university_name"]
#         extra_kwargs = {
#             "college_course": {"write_only": True}
#         }

#     def get_university_name(self, obj):
#         return (
#             obj.college_course.course.university.name
#             if obj.college_course and obj.college_course.course and obj.college_course.course.university
#             else None
#         )


from rest_framework import serializers
from .models import CollegeCourse, CollegeDepartment
from superadmin_app.models import Course, Department, College


class CollegeCourseSerializer(serializers.ModelSerializer):
    university_name = serializers.SerializerMethodField()
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = CollegeCourse
        fields = ['id', 'course', 'course_name', 'university_name']

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        college = College.objects.filter(instution_obj=user.institution).first()
        validated_data['college'] = college
        return super().create(validated_data)

    def get_university_name(self, obj):
        return obj.course.university.name if obj.course and obj.course.university else None


class CollegeDepartmentSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    course_name = serializers.CharField(source="college_course.course.name", read_only=True)
    university_name = serializers.SerializerMethodField()

    class Meta:
        model = CollegeDepartment
        fields = ["id", "college_course", "department", "department_name", "course_name", "university_name"]
        extra_kwargs = {
            "college_course": {"write_only": True}
        }

    def get_university_name(self, obj):
        return (
            obj.college_course.course.university.name
            if obj.college_course and obj.college_course.course and obj.college_course.course.university
            else None
        )



# collegeapp/serializer.py
from rest_framework import serializers
from .models import CollegeCourse, CollegeDepartment
from superadmin_app.models import Course, Department   # <-- import from superadmin_app

# ----------------------------
# Existing serializers
# ----------------------------
# collegeapp/serializers.py
from rest_framework import serializers
from .models import CollegeCourse

class CollegeCourseSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    university_name = serializers.CharField(source="course.university.name", read_only=True)

    class Meta:
        model = CollegeCourse
        fields = ["id", "course_name", "university_name"]



class CollegeDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeDepartment
        fields = "__all__"

# ----------------------------
# New serializers (for available courses/departments per university)
# ----------------------------
class CourseSerializer(serializers.ModelSerializer):
    university_name = serializers.CharField(source="university.name", read_only=True)

    class Meta:
        model = Course
        fields = ["id", "name", "university_name"]


class DepartmentSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    university_name = serializers.CharField(source="course.university.name", read_only=True)

    class Meta:
        model = Department
        fields = ["id", "name", "course_name", "university_name"]


class CourseNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'university']
        
class CollegeCourseNestedSerializer(serializers.ModelSerializer):
    course = CourseNestedSerializer(read_only=True)

    class Meta:
        model = CollegeCourse
        fields = ['id', 'course']

class CollegeDepartmentSerializer(serializers.ModelSerializer):
    college_course = CollegeCourseNestedSerializer(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = CollegeDepartment
        fields = ['id', 'college_course', 'department', 'department_name']

#HOD CREATION AND LISTING and DUD
class HODCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = HOD
        fields = ['username', 'email', 'password', 'phone', 'department']

    def validate_username(self, value):
        if UserProfile.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_department(self, value):
        # ✅ Prevent multiple HODs in one department
        if HOD.objects.filter(department=value).exists():
            raise serializers.ValidationError("This department already has an HOD assigned.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role='hod'
        )

        return HOD.objects.create(user=user, **validated_data)


class HODListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    department_name = serializers.CharField(source='department.name')
    college_name = serializers.CharField(source='department.college.college_name', read_only=True)

   

    class Meta:
        model = HOD
        fields = ['id', 'username', 'email', 'phone', 'department_name','college_name']

        

class HODDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = HOD
        fields = ['id', 'username', 'email', 'phone', 'department']

    


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

    class Meta:
        model = HOD
        fields = ['id', 'username', 'email', 'phone', 'department']



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

    class Meta:
        model = Student
        fields = [
            'id', 'username', 'email', 'phone', 'roll_no',
            'course', 'department', 'semester', 'address', 'photo','gender'
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

