
from rest_framework import serializers
from superadmin_app.models import UserProfile
from .models import VicePrincipal,Subject,Standard,Section,SubjectAllocation,Teacher,Book,Student,Hostel
from datetime import date


# from rest_framework import serializers
# from django.contrib.auth import authenticate
# from .models import UserProfile

# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField(write_only=True)
#     email = serializers.EmailField(required=False)
#     role = serializers.CharField(read_only=True)

#     def validate(self, data):
#         username = data.get('username')
#         password = data.get('password')

#         if username and password:
#             user = authenticate(username=username, password=password)
#             if not user:
#                 raise serializers.ValidationError("Invalid username or password")
            
#             # Add role from UserProfile
#             try:
#                 profile = UserProfile.objects.get(user=user)
#                 data['role'] = profile.role
#             except UserProfile.DoesNotExist:
#                 data['role'] = None

#             data['user'] = user
#             return data
#         else:
#             raise serializers.ValidationError("Must include username and password")



class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField()




# Serializer for creating VicePrincipal
class VicePrincipalCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = VicePrincipal
        fields = ['username', 'password', 'email', 'phone', 'profile_picture']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')

        # Create UserProfile first
        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # Create VicePrincipal linked to the userprofile
        return VicePrincipal.objects.create(userprofile=user, **validated_data)


# Serializer for retrieving VicePrincipal details
class VicePrincipalDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userprofile.username', read_only=True)
    email = serializers.EmailField(source='userprofile.email', read_only=True)

    class Meta:
        model = VicePrincipal
        fields = ['id', 'username', 'email', 'phone', 'profile_picture']


# Serializer for updating VicePrincipal / UserProfile info
class VicePrincipalUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userprofile.username')
    first_name = serializers.CharField(source='userprofile.first_name', required=False)
    last_name = serializers.CharField(source='userprofile.last_name', required=False)

    class Meta:
        model = VicePrincipal
        fields = ['id', 'username', 'first_name', 'last_name', 'phone', 'profile_picture']

    def validate_username(self, value):
        # Get the current VP's linked userprofile
        instance = getattr(self, 'instance', None)
        if instance:
            current_user_id = instance.userprofile.id
            if UserProfile.objects.exclude(id=current_user_id).filter(username=value).exists():
                raise serializers.ValidationError("Username already exists.")
        return value

    def update(self, instance, validated_data):
        # Extract nested userprofile data
        userprofile_data = validated_data.pop('userprofile', {})
        userprofile = instance.userprofile

        # Update userprofile fields
        for attr, value in userprofile_data.items():
            setattr(userprofile, attr, value)
        userprofile.save()

        # Update VicePrincipal fields
        return super().update(instance, validated_data)

    
class SectionSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Section
        
        fields = ['id', 'name']


class StandardSerializer(serializers.ModelSerializer):
    
    sections = SectionSerializer(many=True, read_only=True)
    
    section_ids = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all(),many=True,write_only=True,source='sections')

    class Meta:
        
        model = Standard
        
        fields = ['id', 'name','sections', 'section_ids']


# class SectionAllocationSerializer(serializers.ModelSerializer):
#     standard_name = serializers.CharField(source='standard.name', read_only=True)
#     section_name = serializers.CharField(source='section.name', read_only=True)
#     class_teacher_name = serializers.CharField(source='class_teacher.name', read_only=True)  # assumes UserProfile has 'name' field

#     class Meta:
#         model = SectionAllocation
#         fields = [
#             'id',
#             'standard',        # ID for writing
#             'standard_name',   # Readable name
#             'section',         # ID for writing
#             'section_name',    # Readable name
#             'academic_year',
#             'class_teacher',   # ID for writing
#             'class_teacher_name',  # Readable name
#             'capacity',
#         ]

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'code']
        

class SubjectAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectAllocation
        fields = ['id', 'subject', 'teacher', 'standard', 'section']



class TeacherSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Teacher
        fields = ['username', 'password', 'email', 'phone', 'gender']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')

        # Create related user profile
        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role='teacher'
        )

        # Create teacher and assign to user
        return Teacher.objects.create(user=user, **validated_data)


class TeacherDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.EmailField(source="user.email")
    role = serializers.CharField(source="user.role")

    class Meta:
        model = Teacher
        fields = [
            "id",
            "username",
            "email",
            "phone",
            "gender",
            "role",
        ]
        read_only_fields = ["id"]

    def update(self, instance, validated_data):
        # Extract nested user data
        user_data = validated_data.pop("user", {})

        # Update username with uniqueness check
        new_username = user_data.get("username")
        if new_username and new_username != instance.user.username:
            if UserProfile.objects.filter(username=new_username).exclude(pk=instance.user.pk).exists():
                raise serializers.ValidationError({"username": "This username is already taken."})
            instance.user.username = new_username

        # Update email
        new_email = user_data.get("email")
        if new_email:
            instance.user.email = new_email

        # Update role
        new_role = user_data.get("role")
        if new_role:
            instance.user.role = new_role

        # Save user changes
        instance.user.save()

        # Update Teacher fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
    


class SubjectAllocationDetailSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    teacher = TeacherSerializer(read_only=True)
    standard = StandardSerializer(read_only=True)
    section = SectionSerializer(read_only=True)

    class Meta:
        model = SubjectAllocation
        fields = ['id', 'subject', 'teacher', 'standard', 'section']


##HOSTEL

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

    
        

# =============================
# CREATE STUDENT
# =============================
class StudentCreateSerializer(serializers.ModelSerializer):
    profilePic = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Student
        fields = [
            'admissionNumber',
            'rollNo',
            'studentName',
            'standard',
            'section',
            'gender',
            'dob',
            'Email',
            'studentAddress',
            'parentname',
            'relationship',
            'parentPhone',
            'profilePic'
        ]

    def create(self, validated_data):
        return Student.objects.create(**validated_data)


# =============================
# LIST STUDENTS
# =============================
class StudentListSerializer(serializers.ModelSerializer):
    profilePic = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'admissionNumber',
            'rollNo',
            'studentName',
            'standard',
            'section',
            'gender',
            'dob',
            'Email',
            'studentAddress',
            'parentname',
            'relationship',
            'parentPhone',
            'profilePic'
        ]


# =============================
# DETAIL + UPDATE STUDENT
# =============================


class StudentDetailSerializer(serializers.ModelSerializer):
    profilePic = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'admissionNumber',
            'rollNo',
            'studentName',
            'standard',
            'section',
            'gender',
            'dob',
            'Email',
            'studentAddress',
            'parentname',
            'relationship',
            'parentPhone',
            'profilePic'
        ]

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author',
            'isbn',
            'category',
            'quantity',
            'added_on',
        ]
        read_only_fields = ['id', 'added_on']
        
    



class BookDetailSerializer(serializers.ModelSerializer):
    # Example of an extra computed field
    days_in_library = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author',
            'isbn',
            'category',
            'quantity',
            'added_on',
            'days_in_library',
            'is_available',
        ]
        read_only_fields = ['id', 'added_on', 'days_in_library', 'is_available']

    def get_days_in_library(self, obj):
        """Calculate how many days the book has been in the library."""
        return (date.today() - obj.added_on.date()).days

    def get_is_available(self, obj):
        """Check if the book has available copies."""
        return obj.quantity > 0


from rest_framework import serializers
from .models import StaffRole

from superadmin_app.models import UserProfile  # adjust import if needed



##STAFF

class StaffRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffRole
        fields = [
            "id",
            "user",            # 👈 include this
            "phone",
            "profile_picture",
            "staff_role",
            "can_access_library",
            "can_access_exam",
            "can_access_finance",
            "can_access_arts_sports",
            "can_access_lab",
            "can_access_hostel",
        ]



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


class StudentBusAllocationSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.username', read_only=True)
    roll_no = serializers.CharField(source='student.roll_no', read_only=True)
    bus_details = BusSerializer(source='bus', read_only=True)
    stop_details = BusStopSerializer(source='stop', read_only=True)

    class Meta:
        
        model = StudentBusAllocation
        
        fields = ['id', 'student', 'student_name', 'roll_no', 'bus', 'bus_details', 'stop', 'stop_details']
