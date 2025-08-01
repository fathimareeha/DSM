# collegeapp/serializers.py

from rest_framework import serializers
from .models import HOD
from superadmin_app.models import College, UserProfile

# READ serializer (for display)
class HODSerializer(serializers.ModelSerializer):
    class Meta:
        model = HOD
        fields = ['id', 'user','name', 'email', 'phone', 'department', 'college']
        depth = 1  # expands nested user and college info

# WRITE serializer (for creating/updating)
class HODCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HOD
        fields = ['user','name', 'email', 'phone', 'department', 'college']
