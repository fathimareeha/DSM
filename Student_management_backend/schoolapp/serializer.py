
from rest_framework import serializers
from superadmin_app.models import UserProfile, School
from .models import VicePrincipal,Subject,Standard,Section



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
        


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name']



class StandardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Standard
        fields = ['id', 'name', 'school']
        read_only_fields = ['school']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']



