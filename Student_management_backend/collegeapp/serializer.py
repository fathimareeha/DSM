
# department/serializers.py
from rest_framework import serializers
from collegeapp.models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name','college']
        read_only_fields = ['college']  # Make college auto-assigned, not client-provided



from rest_framework import serializers
from .models import HOD
from collegeapp.models import UserProfile, Department, College



class HODCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = HOD
        fields = ['username', 'email', 'password', 'phone', 'department', 'college']

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
            role='hod'
        )

        return HOD.objects.create(user=user, **validated_data)
    
    

class HODListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    department_name = serializers.CharField(source='department.name')
    college_name = serializers.CharField(source='college.college_name')

    class Meta:
        model = HOD
        fields = ['id', 'username', 'email', 'phone', 'department_name', 'college_name']



from rest_framework import serializers
from superadmin_app.models import UserProfile
from .models import Faculty

class FacultyCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Faculty
        fields = ['username', 'email', 'password', 'phone', 'designation', 'department', 'college']

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
    college_name = serializers.CharField(source='college.college_name')

    class Meta:
        model = Faculty
        fields = ['id', 'username', 'email', 'phone', 'designation', 'department_name', 'college_name']



from rest_framework import serializers
from .models import Semester

class SemesterSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    department_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Semester
        fields = ['id', 'name', 'department_id', 'department_name']



from rest_framework import serializers
from .models import Subject

class SubjectSerializer(serializers.ModelSerializer):
    semester_name = serializers.CharField(source='semester.name', read_only=True)
    semester_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'name', 'code', 'semester_id', 'semester_name']



from rest_framework import serializers
from .models import SubjectAllocation

class SubjectAllocationSerializer(serializers.ModelSerializer):
    faculty_name = serializers.CharField(source='faculty.user.username', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    semester_name = serializers.CharField(source='semester.name', read_only=True)

    class Meta:
        model = SubjectAllocation
        fields = ['id', 'faculty', 'faculty_name', 'subject', 'subject_name', 'semester', 'semester_name']
