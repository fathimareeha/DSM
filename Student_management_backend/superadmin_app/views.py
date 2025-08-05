from django.shortcuts import render
from rest_framework import generics
from .serializer import UserSerializer,SchoolSerializer,CollegeSerializer,InstitutionAdminLoginSerializer,Subscription_packageSerializer,PaymentSerializer,AllInstitutionSerializer,NotificationSerializer
from .models import UserProfile,School,College,Institution,SubscriptionPackage,Payment,Notification,StaffRole
from rest_framework import authentication,permissions,serializers
from rest_framework.views import APIView 
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .permission import IsInstitutionAdmin,IsSuperadminOrStaff,IsSuperadminOrReadOnlyForStaff,IsSuperAdminOrSchoolManager,IsSuperAdminOrCollegeManager,IsSuperAdminOrPackageManager
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
from django.contrib.auth import get_user_model, authenticate
from .serializer import AdminLoginSerializer
from django.db.models import Sum, F
from rest_framework.decorators import api_view

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
    
    def perform_create(self, serializer):
        serializer.save(role='institution_admin')
    
    def get_queryset(self):
        return UserProfile.objects.filter(role="institution_admin")
    

class DeleteInstitutionAndAdmin(generics.DestroyAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            institution = Institution.objects.get(id=pk)
            admin_profile = institution.user_object  # Get linked UserProfile
            
            # Delete the admin — this will auto-delete Institution due to CASCADE
            admin_profile.delete()

            return Response({"message": "Admin and Institution deleted"}, status=status.HTTP_204_NO_CONTENT)
        
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)  
    
class Institution_adminDelete(generics.DestroyAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAdminUser]
    serializer_class=UserSerializer
    
    def get_queryset(self):
        return UserProfile.objects.filter(role="institution_admin")
    
    
class CreateListStaffView(generics.ListCreateAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsSuperadminOrReadOnlyForStaff]  # Only admins can create staff
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user=serializer.save(role='staff')
        
        staff_role = self.request.data.get('staff_role', 'general_staff')  # default if not provided
        can_access_school = False
        can_access_college = False
        can_access_package = False

        if staff_role == 'school_manager':
            can_access_school = True
        elif staff_role == 'college_manager':
            can_access_college = True
        elif staff_role == 'package_manager':
            can_access_package = True

        # Create StaffRole object
        StaffRole.objects.create(
            user=user,
            staff_role=staff_role,
            can_access_school=can_access_school,
            can_access_college=can_access_college,
            can_access_package=can_access_package
        )


    def get_queryset(self):
        return UserProfile.objects.filter(role="staff")

class CreateSchoolView(generics.ListCreateAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsSuperadminOrReadOnlyForStaff]  # Only superadmin
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
    permission_classes=[IsSuperAdminOrSchoolManager]
    serializer_class = SchoolSerializer
    queryset = School.objects.all()
    
    
class GetSchoolByInstitution(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes = [IsSuperAdminOrSchoolManager]

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
    permission_classes = [IsSuperAdminOrCollegeManager]

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
    permission_classes=[IsSuperadminOrReadOnlyForStaff]
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
    permission_classes=[IsSuperAdminOrCollegeManager]
    serializer_class = CollegeSerializer
    queryset = College.objects.all()

# views.py



class AdminLoginView(APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if  user.role !='staff' and not user.is_superuser:
            return Response({'detail': 'You are not authorized to login here'}, status=status.HTTP_403_FORBIDDEN)

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'is_superuser': user.is_superuser,
            'is_staff': user.is_staff
        }, status=status.HTTP_200_OK)


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
                "institution_type": institution_type,  # Optional
                "user": UserSerializer(user).data
                })
        
        return Response(serializer.errors)
    def get(self, request, *args, **kwargs):
        """
        Return the authenticated user's data (only if logged in).
        """
        if request.user.is_authenticated:
            return Response({
                "user": UserSerializer(request.user).data
            })
        return Response({"detail": "Authentication credentials were not provided."}, status=401)
class CreateListPackage(generics.ListCreateAPIView):
    
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[IsSuperAdminOrPackageManager]
    serializer_class=Subscription_packageSerializer
    
    def get_queryset(self):
        institution_type = self.request.query_params.get('institution_type')  # e.g., ?institution_type=school
        queryset = SubscriptionPackage.objects.all()
        
        if institution_type:
            queryset = queryset.filter(institution_type=institution_type)
        return queryset

    
    
    def perform_create(self, serializer):
        return serializer.save(user_obj=self.request.user)

    
class UpdateRetrievePackage(generics.RetrieveUpdateAPIView):
    authentication_classes=[IsSuperAdminOrPackageManager]
    permission_classes=[permissions.IsAdminUser]
    serializer_class=Subscription_packageSerializer
    queryset=SubscriptionPackage.objects.all()
    
    
class ListPackage(generics.ListAPIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[IsInstitutionAdmin]
    serializer_class=Subscription_packageSerializer
    
    def get_queryset(self):
        user = self.request.user

        # Get the institution linked to the institution admin
        institution = Institution.objects.get(user_object=user)

        # Check the institution type (school or college)
        is_school = School.objects.filter(instution_obj=institution).exists()
        is_college = College.objects.filter(instution_obj=institution).exists()

        if is_school:
            institution_type = 'school'
        elif is_college:
            institution_type = 'college'
        else:
            institution_type = None

        # Filter packages based on institution type
        if institution_type:
            return SubscriptionPackage.objects.filter(institution_type=institution_type)
        else:
            return SubscriptionPackage.objects.none()
    



    
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
        # Check if ?active=true is passed in the query params
        active_only = request.query_params.get('active') == 'true'

        # Base queryset
        school_queryset = School.objects.select_related('instution_obj__user_object')
        college_queryset = College.objects.select_related('instution_obj__user_object')

        # Apply filter if active_only is true
        if active_only:
            school_queryset = school_queryset.filter(is_active=True)
            college_queryset = college_queryset.filter(is_active=True)

        # Build school data
        school_data = []
        for school in school_queryset:
            user = school.instution_obj.user_object
            school_data.append({
                "name": school.school_name,
                "registration_id": school.registration_id,
                "type": "school",
                "is_active": school.is_active,
                "username": user.username,
                "admin_id":user.id,
                "email": user.email,
                "phone":school.phone_number,
                "id":school.instution_obj.id
            })

        # Build college data
        college_data = []
        for college in college_queryset:
            user = college.instution_obj.user_object
            college_data.append({
                "name": college.college_name,
                "registration_id": college.registration_id,
                "type": "college",
                "is_active": college.is_active,
                "username": user.username,
                "email": user.email,
                "phone":college.phone_number,
                "id":college.instution_obj.id
            })

        # Combine and return
        combined_data = school_data + college_data
        return Response(combined_data)
    
class ListInstitutionAdminsWithDetails(APIView):
    def get(self, request):
        institutions = Institution.objects.select_related('user_object').all()
        results = []

        for institution in institutions:
            admin = institution.user_object

            school = School.objects.filter(instution_obj=institution).first()
            college = College.objects.filter(instution_obj=institution).first()

            institution_type = None
            if school:
                institution_type = 'School'
            elif college:
                institution_type = 'College'
            else:
                institution_type = 'Not Registered'

            data = {
                "admin_id": admin.id,
                "admin_username": admin.username,
                "admin_email": admin.email,
                "institution_id": institution.id,
                "institution_created": institution.created_date,
                "institution_updated": institution.updated_date,
                "institution_type": institution_type,
                "school": None,
                "college": None
            }

            if school:
                data["school"] = {
                    "name": school.school_name,
                    "registration_id": school.registration_id,
                    "is_active": school.is_active,
                    "phone": school.phone_number
                }

            if college:
                data["college"] = {
                    "name": college.college_name,
                    "registration_id": college.registration_id,
                    "is_active": college.is_active,
                    "phone": college.phone_number
                }

            results.append(data)

        return Response(results)
        
        
        
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
            institution = Institution.objects.get(user_object=request.user)

        
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
                    
            try:
                institution_name = None
                if school:
                    institution_name = school.school_name
                elif college:
                    institution_name = college.college_name
                else:
                    institution_name = f"Institution {institution.id}"

                Notification.objects.create(
                    institution=institution,
                    notification_type='payment_done',
                    title="Payment Received",
                    message=f"A payment has been received for '{institution_name}'."
                )
                print("✅ Notification created")
            except Exception as e:
                print("❌ Notification creation failed:", e)

                            
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

                Notification.objects.get_or_create(
                    institution=institution,
                    notification_type='trial_expired',
                    title="Trial Expired",
                    message=f"The trial period for school '{school.school_name}' has expired.",
                    is_read=False
                )

                return Response({"trial_status": "expired", "type": "school"}, status=200)


            if school.activation_date and school.is_active and latest_payment:
                Notification.objects.filter(
                institution=institution,
                notification_type__in=['trial_expired','payment_due']).delete()
                expiry_date = None
                if latest_payment.package_obj.plan_type == 'monthly':
                    expiry_date = school.activation_date + timedelta(minutes=3)  # change to days=30 for real
                    
                    print("monthly",expiry_date)
                elif latest_payment.package_obj.plan_type == 'yearly':
                   
                    expiry_date = school.activation_date + timedelta(days=365)
                    print("yearly",expiry_date)
                if expiry_date and today > expiry_date:
                    school.is_active = False
                    school.save()

                    Notification.objects.get_or_create(
                        institution=institution,
                        notification_type='payment_due',
                        title="Subscription Expired",
                        message=f"The subscription for school '{school.school_name}' has expired.",
                        is_read=False
                    )

                    return Response({"trial_status": "expired", "type": "school", "reason": "subscription_expired"}, status=200)

        # College check
        college = College.objects.filter(instution_obj=institution).first()
        if college:
            trial_end = college.created_date + timedelta(minutes=4)
            if today > trial_end and not latest_payment:
                college.is_active = False
                college.save()

                Notification.objects.get_or_create(
                    institution=institution,
                    notification_type='trial_expired',
                    title="Trial Expired",
                    message=f"The trial period for college '{college.college_name}' has expired.",
                    is_read=False
                )

                return Response({"trial_status": "expired", "type": "college"}, status=200)

            if college.activation_date and college.is_active and latest_payment:
                Notification.objects.filter(
                institution=institution,
                notification_type__in=['trial_expired','payment_due']
                ).delete()
                expiry_date = None
                if latest_payment.package_obj.plan_type == 'monthly':
                    expiry_date = college.activation_date + timedelta(days=30)
                elif latest_payment.package_obj.plan_type == 'yearly':
                    expiry_date = college.activation_date + timedelta(days=365)

                if expiry_date and today > expiry_date:
                    college.is_active = False
                    college.save()

                    Notification.objects.get_or_create(
                        institution=institution,
                        notification_type='payment_due',
                        title="Subscription Expired",
                        message=f"The subscription for college '{college.college_name}' has expired.",
                        is_read=False
                    )

                    return Response({"trial_status": "expired", "type": "college", "reason": "subscription_expired"}, status=200)

                
        if school and not school.is_active:
                return Response({"trial_status": "expired", "type": "school", "reason": "already_deactivated"}, status=200)
        if college and not college.is_active:
                return Response({"trial_status": "expired", "type": "college", "reason": "already_deactivated"}, status=200)
            
        unread_count = Notification.objects.filter(is_read=False).count()
        print("🔴 Unread Notification Count:", unread_count)
   
        return Response({"trial_status": "valid","unread_notifications_global": unread_count}, status=200)

@api_view(['POST'])

def mark_all_notifications_read(request):
    Notification.objects.filter(is_read=False).update(is_read=True)
    return Response({'status': 'All notifications marked as read'})

class NotificationListView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsSuperadminOrStaff]

    def get(self, request):
        

        notifications = Notification.objects.all().order_by('-created_at')[:50]  # latest 50
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    
    
class Institution_HomepageView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        institution = user.institution

        school = institution.school_set.first()
        college = institution.college_set.first()

        if school:
            institution_type = "school"
            institution_name = school.school_name
            homepage_message = "Welcome to the School Admin Homepage!"
        elif college:
            institution_type = "college"
            institution_name = college.college_name
            homepage_message = "Welcome to the College Admin Homepage!"
        else:
            institution_type = "unknown"
            institution_name = "Unknown"
            homepage_message = "Institution type not recognized."

        return Response({
            "message": f"Welcome, {user.username}!",
            "role": user.role,
            "institution_type": institution_type,
            "institution_name": institution_name,
            "homepage": homepage_message
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




class TotalInstitutionCountView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsSuperadminOrStaff]

    def get(self, request):
        school_count = School.objects.count()
        college_count = College.objects.count()
        total_institution_count = school_count + college_count
        
        active_school_count = School.objects.filter(is_active=True).count()
        inactive_school_count= School.objects.filter(is_active=False).count()
        active_college_count = College.objects.filter(is_active=True).count()
        inactive_college_count=College.objects.filter(is_active=False).count()
        total_inactive_institution_count=inactive_school_count+inactive_college_count
        total_active_institution_count = active_school_count + active_college_count
        
        total_amount_paid = Payment.objects.filter(is_paid=True).aggregate(
            total_amount=Sum(F('package_obj__price'))
        )['total_amount'] or 0
        
        staff_count=User.objects.filter(role='staff').count()

        return Response({
            "total_schools": school_count,
            "total_colleges": college_count,
            "total_institutions": total_institution_count,
            "active_school_count":active_school_count,
            "active_college_count":active_college_count,
            "total_active_institution_count":total_active_institution_count,
            'inactive_school_count':inactive_school_count,
            'inactive_college_count':inactive_college_count,
            'total_inactive_institution_count':total_inactive_institution_count,
            'total_amount':float(total_amount_paid),
            'staff_count':staff_count
        })
        
    
class InstitutionDetailView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsSuperadminOrStaff]

    def get(self, request, institution_id):
        try:
            institution = Institution.objects.get(id=institution_id)
            user = institution.user_object  # This gives username/email

            school = School.objects.filter(instution_obj=institution).first()
            college = College.objects.filter(instution_obj=institution).first()

            if school:
                school_data = SchoolSerializer(school).data
                school_data['type'] = 'school'
                school_data['username'] = user.username
                school_data['email'] = user.email
                return Response(school_data)

            elif college:
                college_data = CollegeSerializer(college).data
                college_data['type'] = 'college'
                college_data['username'] = user.username
                college_data['email'] = user.email
                return Response(college_data)

            else:
                return Response({"detail": "No school or college found for this institution"})

        except Institution.DoesNotExist:
            return Response({"detail": "Institution not found"})

class LatestPaymentReportView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, institution_id):
        try:
            # Get institution object
            institution = get_object_or_404(Institution, id=institution_id)

            # Get the admin user associated with the institution
            user = UserProfile.objects.filter(institution=institution, role="institution_admin").first()
            if not user:
                return Response({"detail": "Institution admin user not found."}, status=404)

            # Get the latest paid payment
            latest_payment = (
                Payment.objects
                .filter(user_obj=user, is_paid=True)
                .select_related('user_obj', 'package_obj')
                .order_by('-start_date')
                .first()
            )

            # Get school/college info
            school = School.objects.filter(instution_obj=institution).first()
            college = College.objects.filter(instution_obj=institution).first()

            if not latest_payment:
                # Default fallback values
                institution_type = None
                institution_name = None
                registration_id = None
                created_date = None

                if school:
                    institution_type = 'school'
                    institution_name = school.school_name
                    registration_id = school.registration_id
                    created_date = school.created_date
                elif college:
                    institution_type = 'college'
                    institution_name = college.college_name
                    registration_id = college.registration_id
                    created_date = college.created_date
                else:
                    return Response({"detail": "Institution not found."}, status=404)

                # Trial logic
                trial_expiry = created_date + timedelta(minutes=4)
                if timezone.now() <= trial_expiry:
                    return Response({
                        "institution_id": institution.id,
                        "institution_type": institution_type,
                        "institution_name": institution_name,
                        "registration_id": registration_id,
                        "username": user.username,
                        "email": user.email,
                        "payment_status": "trial",
                        "start_date": created_date,
                        "end_date": trial_expiry,
                        "is_paid": False
                    }, status=200)

                return Response({"detail": "No paid payment found and trial expired."}, status=404)

            # Paid user details
            data = {
                "institution_id": institution.id,
                "institution_type": "school" if school else "college" if college else "unknown",
                "institution_name": school.school_name if school else college.college_name if college else "N/A",
                "registration_id": school.registration_id if school else college.registration_id if college else "N/A",
                "username": user.username,
                "email": user.email,
                "package": latest_payment.package_obj.package,
                "amount": latest_payment.package_obj.price,
                "plan_type": latest_payment.package_obj.plan_type,
                "start_date": latest_payment.start_date,
                "end_date": latest_payment.end_date,
                "is_paid": latest_payment.is_paid,
            }

            return Response(data, status=200)

        except Exception as e:
            return Response({"detail": "Error occurred", "error": str(e)}, status=400)



class DeactivateInstitutionView(APIView):
    def post(self, request, institution_type, institution_id):
        if institution_type == "school":
            try:
                school = School.objects.get(id=institution_id)
                school.is_active = False
                school.save()
                return Response({"message": "School deactivated successfully"}, status=status.HTTP_200_OK)
            except School.DoesNotExist:
                return Response({"error": "School not found"}, status=status.HTTP_404_NOT_FOUND)

        elif institution_type == "college":
            try:
                college = College.objects.get(id=institution_id)
                college.is_active = False
                college.save()
                return Response({"message": "College deactivated successfully"}, status=status.HTTP_200_OK)
            except College.DoesNotExist:
                return Response({"error": "College not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid institution type"}, status=status.HTTP_400_BAD_REQUEST)