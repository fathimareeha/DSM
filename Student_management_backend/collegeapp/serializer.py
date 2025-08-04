# collegeapp/serializers.py

from rest_framework import serializers
from .models import HOD
from superadmin_app.models import College, UserProfile

# READ serializer (for display)
class HODSerializer(serializers.ModelSerializer):
    class Meta:
        model = HOD
        fields = ['id','user','name', 'email', 'phone', 'department', 'college']
        depth = 1  # expands nested user and college info

# WRITE serializer (for creating/updating)
# class HODCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = HOD
#         fields = ['name','user', 'email', 'phone', 'department', 'college']




# department/serializers.py
from rest_framework import serializers
from collegeapp.models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name','college']


class HODCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = HOD
        fields = ['username', 'password', 'name', 'email', 'phone', 'department', 'college']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data['email']

        user = UserProfile.objects.create_user(username=username, password=password, email=email)
        validated_data['user'] = user

        return HOD.objects.create(**validated_data)


