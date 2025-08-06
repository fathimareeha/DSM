
from rest_framework import serializers
from superadmin_app.models import UserProfile,School # Adjust if needed

from .models import VicePrincipal

# class VicePrincipalCreateSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(write_only=True)
#     password = serializers.CharField(write_only=True)
#     email = serializers.EmailField(write_only=True)
#     school = serializers.PrimaryKeyRelatedField(queryset=School.objects.all())


#     class Meta:
#         model = VicePrincipal
#         fields = ['username', 'password', 'email', 'phone', 'school']

#     def create(self, validated_data):
#         # Extract user-related fields
#         username = validated_data.pop('username')
#         password = validated_data.pop('password')
#         email = validated_data.pop('email')
#         school = validated_data.pop('school')

#         # Create the UserProfile with 'viceprincipal' role
#         user = UserProfile.objects.create_user(
#             username=username,
#             email=email,
#             password=password,
#             role='viceprincipal'
#         )

#         # Create the VicePrincipal linked to this user
#         return VicePrincipal.objects.create(user=user,school=school, **validated_data)



from rest_framework import serializers
from superadmin_app.models import UserProfile, School
from .models import VicePrincipal

# class VicePrincipalCreateSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(write_only=True)
#     password = serializers.CharField(write_only=True)
#     email = serializers.EmailField(write_only=True)
#     school = serializers.PrimaryKeyRelatedField(queryset=School.objects.all())

#     class Meta:
#         model = VicePrincipal
#         fields = ['username', 'password', 'email', 'phone', 'school']

#     def validate_username(self, value):
#         if UserProfile.objects.filter(username=value).exists():
#             raise serializers.ValidationError("This username is already taken.")
#         return value

#     def create(self, validated_data):
#         username = validated_data.pop('username')
#         password = validated_data.pop('password')
#         email = validated_data.pop('email')
#         school = validated_data.pop('school')

#         # ✅ Safe: username has already been validated
#         user = UserProfile.objects.create_user(
#             username=username,
#             email=email,
#             password=password,
#             role='viceprincipal'
#         )

#         return VicePrincipal.objects.create(user=user, school=school, **validated_data)



# serializers.py

# serializers.py

class VicePrincipalCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = VicePrincipal
        fields = ['username', 'password', 'email', 'phone', 'school']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')

        user = UserProfile.objects.create_user(
            username=username,
            email=email,
            password=password,
            role='viceprincipal'
        )
        return VicePrincipal.objects.create(user=user, **validated_data)


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['school_name']

class VicePrincipalDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    role = serializers.CharField(source='user.role')
    school = SchoolSerializer()

    class Meta:
        model = VicePrincipal
        fields = ['id', 'username', 'email', 'phone', 'role', 'school']


