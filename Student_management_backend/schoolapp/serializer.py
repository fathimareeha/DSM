from rest_framework import serializers
from .models import VicePrincipal
from superadmin_app.models import UserProfile
from schoolapp.models import School

class VicePrincipalCreateSerializer(serializers.ModelSerializer):
 

    class Meta:
        model = VicePrincipal
        fields = ['id', 'user', 'phone', 'school']

    # def validate_phone(self, value):
    #     if not value.isdigit():
    #         raise serializers.ValidationError("Phone number must contain only digits.")
    #     return value






