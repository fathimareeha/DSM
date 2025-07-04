from django.shortcuts import render
from rest_framework import generics
from .serializer import UserSerializer,SchoolSerializer,CollegeSerializer,InstitutionAdminLoginSerializer,Subscription_packageSerializer,PaymentSerializer,AllInstitutionSerializer
from .models import UserProfile,School,College,Institution,SubscriptionPackage,Payment
from rest_framework import authentication,permissions,serializers
from rest_framework.views import APIView 
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .permission import IsInstitutionAdmin
import razorpay
from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from rest_framework import status
  # or your custom user model
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from django.contrib.auth.tokens import default_token_generator

User = get_user_model()


SECRET_KEY='scF0IXTa15CIYsinEfjDaa5D' # put the downloaded secretkey and key_id here 
KEY_ID='rzp_test_1GToET5GDSxcq2'

# Create your views here.


class CreateUserView(generics.ListCreateAPIView):
    
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class=UserSerializer
    queryset=UserProfile.objects.all()
    
    def get_queryset(self):
        return UserProfile.objects.filter(role="institution_admin")
    
class Institution_adminDelete(generics.DestroyAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class=UserSerializer
    
    def get_queryset(self):
        return UserProfile.objects.filter(role="institution_admin")
    
    
class CreateStaffView(generics.CreateAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]  # Only admins can create staff
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(role='staff')

    

class CreateSchoolView(generics.ListCreateAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]  # Only superadmin
    serializer_class = SchoolSerializer
    queryset = School.objects.all()

    def perform_create(self, serializer):
        institution_id = self.kwargs.get('pk')

        try:
            institution = Institution.objects.get(id=institution_id)

            if School.objects.filter(instution_obj=institution).exists():
                raise serializers.ValidationError("A school is already registered for this institution.")
            if College.objects.filter(instution_obj=institution).exists():
                raise serializers.ValidationError("This institution already has a college, cannot add school.")

            serializer.save(instution_obj=institution)

        except Institution.DoesNotExist:
            raise serializers.ValidationError("Institution not found.")

class UpdateRetireveDeleteSchoolView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class = SchoolSerializer
    queryset = School.objects.all()
    
    
class GetSchoolByInstitution(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, institution_id):
        try:
            school = School.objects.get(instution_obj__id=institution_id)
            serializer = SchoolSerializer(school)
            return Response(serializer.data)
        except School.DoesNotExist:
            return Response({"detail": "No School found for this institution"})
        
    def put(self,request,institution_id):
        
        try:
            school = School.objects.get(instution_obj__id=institution_id)
        except School.DoesNotExist:
            return Response({"detail": "School not found"})

        serializer = SchoolSerializer(school, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        
class GetCollegeByInstitution(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, institution_id):
        try:
            college = College.objects.get(instution_obj__id=institution_id)
            serializer = CollegeSerializer(college)
            return Response(serializer.data)
        except College.DoesNotExist:
            return Response({"detail": "No college found for this institution"})
        
    def put(self,request,institution_id):
        
        try:
            college = College.objects.get(instution_obj__id=institution_id)
        except College.DoesNotExist:
            return Response({"detail": "College not found"})

        serializer = CollegeSerializer(college, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
            
class CreateCollegeView(generics.ListCreateAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class=CollegeSerializer
    queryset=College.objects.all()
    
    def perform_create(self, serializer):
        id = self.kwargs.get('pk')
        try:
            institution_obj = Institution.objects.get(id=id)
            
            
            
            # Check if this institution already has a school or college
            if College.objects.filter(instution_obj=institution_obj).exists():
                raise serializers.ValidationError("A college is already registered for this institution.")

            if School.objects.filter(instution_obj=institution_obj).exists():
                raise serializers.ValidationError("This institution already has a school, cannot add college.")

            serializer.save(instution_obj=institution_obj)
        except Institution.DoesNotExist:
            raise serializers.ValidationError("Institution not found.")

class UpdateRetireveDeleteCollegeView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class = CollegeSerializer
    queryset = College.objects.all()


class InstitutionAdminLoginView(generics.GenericAPIView)  :
    serializer_class=InstitutionAdminLoginSerializer
    
    def post(self,request,*args,**kwargs):
        serializer=InstitutionAdminLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user=serializer.validated_data['user']
            institution_type = serializer.validated_data['institution_type']
            # Safely get or create token
            token, _ = Token.objects.get_or_create(user=user)

        
            return Response({"message":"Login Successful",
                             "token": token.key,  # ✅ This is what your frontend needs
                "institution_type": institution_type  # Optional
                })
        
        return Response(serializer.errors)
    
class CreateListPackage(generics.ListCreateAPIView):
    
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class=Subscription_packageSerializer
    queryset=SubscriptionPackage.objects.all()
    
    
    def perform_create(self, serializer):
        return serializer.save(user_obj=self.request.user)

    
class UpdateRetrievePackage(generics.RetrieveUpdateAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class=Subscription_packageSerializer
    queryset=SubscriptionPackage.objects.all()
    
    
class ListPackage(generics.ListAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[IsInstitutionAdmin]
    serializer_class=Subscription_packageSerializer
    queryset=SubscriptionPackage.objects.all()
    



    
class CheckoutView(APIView):
    
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    def get(self,request,*args,**kwargs):
        
        
        id=kwargs.get("pk")
        
        sub_package=SubscriptionPackage.objects.get(id=id)
        
        
        serializer_instance=Subscription_packageSerializer(sub_package)
        
        price_obj=serializer_instance.data.get('price')
        
        
        price=int(float(price_obj))*100
        
        
        client = razorpay.Client(auth=(KEY_ID, SECRET_KEY))

        data = { "amount": float(price), "currency": "INR", "receipt": "" }
        payment = client.order.create(data=data)
        payment['package_id'] = id
        
      
        
        
        
        return Response(data=payment)
    
class ListSchoolsCollegesView(APIView):
    def get(self, request):
        school_data = []
        for school in School.objects.select_related('instution_obj__user_object'):
            user = school.instution_obj.user_object
            school_data.append({
                
                "name": school.school_name,
                "registration_id": school.registration_id,
                "type": "school",
                "is_active": school.is_active,
                "username": user.username,
                "email": user.email,
            })

        college_data = []
        for college in College.objects.select_related('instution_obj__user_object'):
            user = college.instution_obj.user_object
            college_data.append({
                
                "name": college.college_name,
                "registration_id": college.registration_id,
                "type": "college",
                "is_active": college.is_active,
                "username": user.username,
                "email": user.email,
            })

        combined_data = school_data + college_data
        serializer = AllInstitutionSerializer(combined_data, many=True)
        return Response(serializer.data)
        
        
class PaymentVerifyView(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    def post(self,request,*args,**kwargs):
        client = razorpay.Client(auth=(KEY_ID, SECRET_KEY))
        print('data',request.data)
        token, _ = Token.objects.get_or_create(user=request.user)
       
        try:
            client.utility.verify_payment_signature(request.data)
            print("successfull")
            id=self.kwargs.get('pk')
            
            package_obj=SubscriptionPackage.objects.get(id=id)
            activation_date=timezone.now()
            
            if package_obj.plan_type=="monthly":
                end_date=activation_date + timedelta(days=30)
            else:
                end_date=activation_date + timedelta(days=365)
                
            Payment.objects.create(
                user_obj=request.user,
                package_obj=package_obj,is_paid=True,
                start_date=activation_date,
                end_date=end_date)
            
                  #Activate the correct institution (school or college)
            institution = request.user.institution
        
            school = School.objects.filter(instution_obj=institution).first()
            college = College.objects.filter(instution_obj=institution).first()
            if school:
                school.is_active=True
                school.activation_date=activation_date
                school.save()
                
            else:
                college.is_active=True
                college.activation_date=activation_date
                college.save()
                    
                        
        except:
            print("failure")
        
        
        return Response({"message": "Payment verification data received.","token": token.key,})
        

   
class DeactivateView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        today = timezone.now()

        try:
            institution = user.institution
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"})

        latest_payment = Payment.objects.filter(user_obj=user, is_paid=True).order_by('-end_date').first()

        # School check
        school = School.objects.filter(instution_obj=institution).first()
        if school:
            trial_end = school.created_date + timedelta(minutes=4)
            
            print("trail date",trial_end)
            if today > trial_end and not latest_payment:
                school.is_active = False
                school.save()
                print("expired",school)
                return Response({"trial_status": "expired", "type": "school"}, status=200)


            if school.activation_date and school.is_active and latest_payment:
                expiry_date = None
                if latest_payment.package_obj.plan_type == 'monthly':
                    expiry_date = school.activation_date + timedelta(minutes=3)  # change to days=30 for real
                    
                    print("monthly",expiry_date)
                elif latest_payment.package_obj.plan_type == 'yearly':
                   
                    expiry_date = school.activation_date + timedelta(days=365)
                    print("yearly",expiry_date)
                if expiry_date and today > expiry_date:
                    school.is_active = False
                    print("working")
                    school.save()
                    return Response({"trial_status": "expired", "type": "school", "reason": "subscription_expired"}, status=200)

        # College check
        college = College.objects.filter(instution_obj=institution).first()
        if college:
            trial_end = college.created_date + timedelta(minutes=4)
            if today > trial_end and not latest_payment:
                college.is_active = False
                college.save()
                return Response({"trial_status": "expired", "type": "college"}, status=200)

            if college.activation_date and college.is_active and latest_payment:
                expiry_date = None
                if latest_payment.package_obj.plan_type == 'monthly':
                    expiry_date = college.activation_date + timedelta(days=30)
                elif latest_payment.package_obj.plan_type == 'yearly':
                    expiry_date = college.activation_date + timedelta(days=365)

                if expiry_date and today > expiry_date:
                    college.is_active = False
                    college.save()
                    return Response({"trial_status": "expired", "type": "college", "reason": "subscription_expired"}, status=200)
                
                
        if school and not school.is_active:
                return Response({"trial_status": "expired", "type": "school", "reason": "already_deactivated"}, status=200)
        if college and not college.is_active:
                return Response({"trial_status": "expired", "type": "college", "reason": "already_deactivated"}, status=200)
            
        return Response({"trial_status": "valid"}, status=200)

    
    
class Institution_HomepageView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Just for testing – real app can return more data
        return Response({
            "message": f"Welcome, {user.username}!",
            "role": user.role,
            "homepage": "This is your institution admin homepage."
        })


from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"detail": "Email is required."}, status=400)

        try:
            user = User.objects.get(email=email, role='institution_admin')
        except User.DoesNotExist:
            return Response({"detail": "No institution admin with this email."}, status=404)

        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:5173/reset-password/{token}?email={email}"

        send_mail(
            subject='Reset Your Password',
            message=f'Click the link to reset your password: {reset_link}',
            from_email='noreply@yourapp.com',
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({"detail": "Reset link sent."}, status=200)



from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

class PasswordResetConfirmView(APIView):
    def post(self, request):
        print("DATA:", request.data)
        email = request.data.get('email')
        token = request.data.get('token')
        password = request.data.get('password')

        if not email or not token or not password:
            return Response({"detail": "Missing fields."}, status=400)

        try:
            user = User.objects.get(email=email, role='institution_admin')
        except User.DoesNotExist:
            return Response({"detail": "Invalid email or role."}, status=404)

        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Invalid or expired token."}, status=400)

        user.set_password(password)
        user.save()

        return Response({"detail": "Password reset successful."}, status=200)
