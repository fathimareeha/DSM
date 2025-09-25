
from rest_framework import serializers
from superadmin_app.models import UserProfile
from .models import Subject,Standard,Section,Teacher,Book,Student,Hostel

from datetime import date


# {LOGIN}

class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField()



# {VICEPRINCIPAL}

# from rest_framework import serializers
# from .models import VicePrincipal, UserProfile

# from rest_framework import serializers
# from .models import VicePrincipal, UserProfile

# from rest_framework import serializers
# from .models import VicePrincipal, UserProfile

# class VicePrincipalCreateSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(write_only=True)
#     password = serializers.CharField(write_only=True, style={'input_type': 'password'})
#     email = serializers.EmailField(write_only=True)

#     class Meta:
#         model = VicePrincipal
#         fields = ['id', 'username', 'password', 'email', 'phone', 'profile_picture']

#     def create(self, validated_data):
#         # Extract UserProfile data
#         username = validated_data.pop('username')
#         password = validated_data.pop('password')
#         email = validated_data.pop('email')

#         # Create UserProfile
#         user = UserProfile.objects.create_user(
#             username=username,
#             email=email,
#             password=password
#         )

#         # Create VicePrincipal linked to this user
#         vice_principal = VicePrincipal.objects.create(
#             userprofile=user,
#             **validated_data
#         )
#         return vice_principal



# class VicePrincipalDetailSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='userprofile.username', read_only=True)
#     email = serializers.EmailField(source='userprofile.email', read_only=True)

#     class Meta:
#         model = VicePrincipal
#         fields = ['id', 'username', 'email', 'phone', 'profile_picture']


# class VicePrincipalUpdateSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='userprofile.username', required=False)
#     password = serializers.CharField(write_only=True, required=False, source='userprofile.password')
#     email = serializers.EmailField(source='userprofile.email', required=False)

#     class Meta:
#         model = VicePrincipal
#         fields = ['id', 'username', 'password', 'email', 'phone', 'profile_picture']

#     def update(self, instance, validated_data):
#         # Extract nested userprofile data
#         userprofile_data = validated_data.pop("userprofile", {})
#         userprofile = instance.userprofile

#         # Update UserProfile fields
#         if "username" in userprofile_data:
#             userprofile.username = userprofile_data["username"]
#         if "email" in userprofile_data:
#             userprofile.email = userprofile_data["email"]
#         if "password" in userprofile_data:
#             userprofile.set_password(userprofile_data["password"])  # ✅ hash password
#         userprofile.save()

#         # Update VicePrincipal fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()

#         return instance


# Serializer for retrieving VicePrincipal details
# class VicePrincipalDetailSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='userprofile.username', read_only=True)
#     email = serializers.EmailField(source='userprofile.email', read_only=True)

#     class Meta:
#         model = VicePrincipal
#         fields = ['id', 'username', 'email', 'phone', 'profile_picture']


# # Serializer for updating VicePrincipal / UserProfile info
# class VicePrincipalUpdateSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='userprofile.username')
#     first_name = serializers.CharField(source='userprofile.first_name', required=False)
#     last_name = serializers.CharField(source='userprofile.last_name', required=False)

#     class Meta:
#         model = VicePrincipal
#         fields = ['id', 'username', 'first_name', 'last_name', 'phone', 'profile_picture']

    # def validate_username(self, value):
    #     # Get the current VP's linked userprofile
    #     instance = getattr(self, 'instance', None)
    #     if instance:
    #         current_user_id = instance.userprofile.id
    #         if UserProfile.objects.exclude(id=current_user_id).filter(username=value).exists():
    #             raise serializers.ValidationError("Username already exists.")
    #     return value

    # def update(self, instance, validated_data):
    #     # Extract nested userprofile data
    #     userprofile_data = validated_data.pop('userprofile', {})
    #     userprofile = instance.userprofile

    #     # Update userprofile fields
    #     for attr, value in userprofile_data.items():
    #         setattr(userprofile, attr, value)
    #     userprofile.save()

        # Update VicePrincipal fields
        # return super().update(instance, validated_data)



# {USERPROFILE}

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email']  # Add more if needed

from rest_framework import serializers
from .models import Teacher, BankAccount, Standard, Section, Subject
from django.contrib.auth import get_user_model

UserProfile = get_user_model()


# {SECTION}

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name','is_active']

class StandardSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Standard
        fields = ['id', 'name', 'sections']
        
        
# ---------------- Subject Serializer ----------------
class SubjectSerializer(serializers.ModelSerializer):
    standard = StandardSerializer(read_only=True)  # optional: show standard details

    class Meta:
        model = Subject
        fields = ['id', 'name', 'code', 'standard']


# ---------------- Bank Account Serializer ----------------
class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['account_name', 'account_number', 'bank_name', 'ifsc_code', 'branch_name']


# ---------------- Teacher Serializer ----------------
class TeacherSerializer(serializers.ModelSerializer):
    bank_account = BankAccountSerializer()  # Nested serializer
    standard = serializers.PrimaryKeyRelatedField(queryset=Standard.objects.all(), many=True)
    section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all(), many=True)
    subjects = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), many=True)

    class Meta:
        model = Teacher
        fields = [
            'id', 'user', 'phone', 'gender', 'profilePic',
            'standard', 'section', 'subjects', 'is_class_teacher',
            'bank_account'
        ]

    def create(self, validated_data):
        bank_data = validated_data.pop('bank_account')
        teacher = Teacher.objects.create(**validated_data)
        BankAccount.objects.create(teacher=teacher, **bank_data)
        return teacher

    def update(self, instance, validated_data):
        bank_data = validated_data.pop('bank_account', None)

        # Update Teacher fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update or create bank account
        if bank_data:
            BankAccount.objects.update_or_create(teacher=instance, defaults=bank_data)

        return instance


##HOSTEL


class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = [
            "id",
            "name",
            "hostel_type",
            "rooms",     # ✅ must match the model
            "warden",
            "address",
            "contact",
        ]
        read_only_fields = ["id"]

# class StudentHostelSerializer(serializers.ModelSerializer):
#     hostel_name = serializers.CharField(source='hostel.name', read_only=True)

#     class Meta:
#         model = Student
#         fields = ['id', 'user', 'roll_no', 'hostel', 'hostel_name', 'room_number']

    
        

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


# {LIBRARY}

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
from django.core.exceptions import ValidationError



class StaffRoleSerializer(serializers.ModelSerializer):
    # Write-only for creation (optional for updates)
    username = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False)

    # Read-only for listing
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    user_username = serializers.CharField(source="user.username", read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = StaffRole
        fields = [
            "id",
            "username", "email", "password",  # creation fields
            "user_id", "user_username", "user_email",  # listing fields
            "staffs_role",
            "can_access_library",
            "can_access_exam",
            "can_access_finance",
            "can_access_arts_sports",
            "can_access_lab",
            "can_access_hostel",
        ]

    def validate(self, attrs):
        """Check if username and email are unique on creation or update."""
        username = attrs.get("username")
        email = attrs.get("email")

        if not getattr(self, 'instance', None):
            # Creation
            if username and UserProfile.objects.filter(username=username).exists():
                raise ValidationError({"username": "This username is already taken."})
            if email and UserProfile.objects.filter(email=email).exists():
                raise ValidationError({"email": "This email is already taken."})
        else:
            # Update: ignore the current instance's username/email
            if username and UserProfile.objects.filter(username=username).exclude(id=self.instance.user.id).exists():
                raise ValidationError({"username": "This username is already taken."})
            if email and UserProfile.objects.filter(email=email).exclude(id=self.instance.user.id).exists():
                raise ValidationError({"email": "This email is already taken."})

        return attrs

    def create(self, validated_data):
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        role = validated_data.get("staffs_role")

        # Auto-set permissions based on role
        role_permission_map = {
            "librarian": "can_access_library",
            "exam_controller": "can_access_exam",
            "finance_officer": "can_access_finance",
            "arts_sports_coordinator": "can_access_arts_sports",
            "lab_coordinator": "can_access_lab",
            "hostel_manager": "can_access_hostel",
        }

        if role in role_permission_map:
            validated_data[role_permission_map[role]] = True

        # Create user account
        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role="staff",  # ensure UserProfile model has a 'role' field
        )

        # Create StaffRole entry
        staff_role = StaffRole.objects.create(user=user, **validated_data)
        return staff_role

    def update(self, instance, validated_data):
        """Update StaffRole and permissions without requiring username/email/password."""
        role = validated_data.get("staffs_role", instance.staffs_role)

        # Auto-set permissions based on role
        role_permission_map = {
            "librarian": "can_access_library",
            "exam_controller": "can_access_exam",
            "finance_officer": "can_access_finance",
            "arts_sports_coordinator": "can_access_arts_sports",
            "lab_coordinator": "can_access_lab",
            "hostel_manager": "can_access_hostel",
        }

        # Reset all permissions first
        for perm in role_permission_map.values():
            setattr(instance, perm, False)

        # Set the permission according to the role
        if role in role_permission_map:
            setattr(instance, role_permission_map[role], True)

        # Update other fields
        instance.staffs_role = role
        instance.save()
        return instance


# {BUS} 

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


