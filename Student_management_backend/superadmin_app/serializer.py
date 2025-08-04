from rest_framework import serializers
from superadmin_app.models import UserProfile,School,College,SubscriptionPackage,Payment,Notification,StaffRole
from django.contrib.auth import authenticate

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    
class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(read_only=True)
    password1=serializers.CharField(write_only=True)
    password2=serializers.CharField(write_only=True)
    
    institution_id = serializers.SerializerMethodField(read_only=True) 
    
    staff_role = serializers.SerializerMethodField()
    class Meta:
        model=UserProfile
        fields=['id','username','password1','password2','role','email','password','institution_id','staff_role']
        extra_kwargs = {'role': {'read_only': True}}
        
    def create(self, validated_data):
        
        password1=validated_data.pop('password1')
        password2=validated_data.pop('password2')
        
        return UserProfile.objects.create_user(**validated_data,password=password1)
    
    def validate(self, data):
        
        if data['password1']!=data['password2']:
            
            raise serializers.ValidationError('password mismatch')
        
        return data
    
    def get_institution_id(self, obj):
        if obj.role == 'institution_admin':
            institution = getattr(obj, 'institution', None)  # reverse OneToOne relation
            if institution:
                return institution.id
        return None

    def get_staff_role(self, obj):
        if obj.role == 'staff':
            try:
                return obj.staff_role.staff_role  # Only return the role name
            except StaffRole.DoesNotExist:
                return None
        return None

class StaffRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffRole
        fields = ['staff_role', 'can_access_school', 'can_access_college', 'can_access_package']
      
class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model=School
        fields='__all__'
        read_only_fields=['id','registration_id','created_date','instution_obj']
        
        
class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model=College
        fields='__all__'
        read_only_fields=['id','registration_id','created_date','instution_obj']
        
        
class InstitutionAdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError('Invalid username or password.')

        if user.role != 'institution_admin':
            raise serializers.ValidationError('User is not an institution admin.')

        try:
            institution = user.institution
            
        
        except:
            raise serializers.ValidationError('Institution not found for this admin.')
        
        if School.objects.filter(instution_obj=institution).exists():
            institution_type = 'school'
        elif College.objects.filter(instution_obj=institution).exists():
            institution_type = 'college'
        else:
            raise serializers.ValidationError('No school or college linked to this institution.')

        data['user'] = user
        data['institution_type'] = institution_type
        return data
    
    
class Subscription_packageSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubscriptionPackage
        fields="__all__"
        read_only_fields=['id','user_obj']
        
        
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Payment
        fields="__all__"
        read_only_fields=['id','user_obj','package_obj']
        
        


class AllInstitutionSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    name = serializers.CharField()
    registration_id=serializers.CharField()
    type = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    is_active = serializers.BooleanField()

        
        

# serializers.py
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'notification_type', 'created_at','is_read']
        
        

        