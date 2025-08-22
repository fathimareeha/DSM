
from rest_framework import serializers
from superadmin_app.models import UserProfile
from .models import VicePrincipal,Subject,Standard,Section,SubjectAllocation,Teacher,Book,Student
from datetime import date


# class UserSerializer(serializers.ModelSerializer):
#     profile_pic = serializers.ImageField(required=False)

#     class Meta:
#         model = User
#         fields = ['id', 'profile_pic']
from rest_framework import serializers
from .models import VicePrincipal
from schoolapp.models import UserProfile  # Your custom user model

# Serializer for creating a Vice Principal
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
        user = UserProfile.objects.create_user(username=username, email=email, password=password)

        # Create VicePrincipal linked to the user
        return VicePrincipal.objects.create(userprofile=user, **validated_data)
       


# Serializer for retrieving Vice Principal details
class VicePrincipalDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userprofile.username', read_only=True)
    email = serializers.EmailField(source='userprofile.email', read_only=True)

    class Meta:
        model = VicePrincipal
        fields = ['id', 'username', 'email', 'phone', 'profile_picture']

from rest_framework import serializers
from superadmin_app.models import UserProfile
from .models import VicePrincipal

class VicePrincipalUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = VicePrincipal
        fields = ['id', 'username', 'first_name', 'last_name']

    def validate_username(self, value):
        # Get the current VP's linked user
        instance = getattr(self, 'instance', None)
        if instance:
            current_user_id = instance.user.id
            if UserProfile.objects.exclude(id=current_user_id).filter(username=value).exists():
                raise serializers.ValidationError("Username already exists.")
        return value

    def update(self, instance, validated_data):
        # Extract nested user data
        user_data = validated_data.pop('user', {})
        user = instance.user

        # Update user fields
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()

        # Update VicePrincipal fields (if any)
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



# from rest_framework import serializers
# from .models import Student, Parent

# from .models import Parent

# class ParentSerializer(serializers.ModelSerializer):
#     name = serializers.CharField(required=False)
#     relationship = serializers.CharField(required=False)
#     phone = serializers.CharField(required=False)

#     class Meta:
#         model = Parent
#         fields = ['id', 'name', 'relationship', 'phone']

# ---------------- Student Serializer ----------------
from rest_framework import serializers
from .models import Student

from rest_framework import serializers
from .models import Student

# =============================
# STUDENT CREATE
# =============================
from rest_framework import serializers
from .models import Student

# =============================
# STUDENT CREATE
# =============================
from rest_framework import serializers
from .models import Student


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
from .models import CoordinatorsRole

class CoordinatorsRoleSerializer(serializers.ModelSerializer):
    # Write-only for creation
    username = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)

    # Read-only for listing
    user_id = serializers.IntegerField(source="user.id", write_only=True)
    user_username = serializers.CharField(source="user.username", write_only=True)
    user_email = serializers.EmailField(source="user.email", write_only=True)

    class Meta:
        model = CoordinatorsRole
        fields = [
            "id",
            "username", "email", "password",  # creation only
            "user_id", "user_username", "user_email",  # read-only
            "coordinators_role",
            "can_access_library",
            "can_access_exam",
            "can_access_finance",
            "can_access_transport",
            "can_access_arts_sports",
            "can_access_lab",
            "can_access_hostel",
        ]

    def validate_username(self, value):
        if UserProfile.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def create(self, validated_data):
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        role = validated_data.get("coordinators_role")

        # Map role to permission
        role_permission_map = {
            "librarian": "can_access_library",
            "controller_of_exam": "can_access_exam",
            "finance_officer": "can_access_finance",
            "transport_officer": "can_access_transport",
            "arts&sports_coordinator": "can_access_arts_sports",
            "lab_coordinator": "can_access_lab",
            "hostel_manager": "can_access_hostel",
        }

        if role in role_permission_map:
            validated_data[role_permission_map[role]] = True

        # Create linked user account
        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=role  # only if your UserProfile has a role field
        )

        return CoordinatorsRole.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        # Update linked user details if provided
        username = validated_data.pop("username", None)
        email = validated_data.pop("email", None)
        password = validated_data.pop("password", None)

        if username:
            instance.user.username = username
        if email:
            instance.user.email = email
        if password:
            instance.user.set_password(password)

        instance.user.save()

        # Update coordinator role-specific data
        return super().update(instance, validated_data)
