from django.db import models
from django.contrib.auth.models import AbstractUser,User
from django.db.models.signals import post_save  
from django.dispatch import receiver
from datetime import timedelta
from django.utils import timezone


# Create your models here.
class UserProfile(AbstractUser):
    role_options=(('staff','staff'),
                ('institution_admin','institution_admin'),
        
                ('viceprincipal', 'Vice Principal'),
                ('teacher', 'Teacher'),
                ('student', 'Student'),
                ('parent', 'Parent'),

                ('hod','hod'),
                ('faculty','faculty'),
                ('students','students'))

    
    role=models.CharField(max_length=50,choices=role_options)
    
    
class Institution(models.Model):
    user_object=models.OneToOneField(UserProfile,on_delete=models.CASCADE,related_name='institution')
    created_date=models.DateField(auto_now_add=True)
    updated_date=models.DateTimeField(auto_now=True)
    
class StaffRole(models.Model):
    ROLE_CHOICES = [
        ('school_manager', 'School Manager'),
        ('college_manager', 'College Manager'),
        ('package_manager', 'Package Manager'),
    ]

    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE , related_name='staff_role')
    staff_role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    can_access_school = models.BooleanField(default=False)
    can_access_college = models.BooleanField(default=False)
    can_access_package = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.staff_role}"   
    
class School(models.Model):
    instution_obj=models.ForeignKey(Institution,on_delete=models.CASCADE)
    registration_id = models.CharField(max_length=20, unique=True, blank=True) 
    school_name=models.CharField(max_length=100)
    address1=models.CharField(max_length=100)
    address2=models.CharField(max_length=100)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    pin_code=models.CharField(max_length=50)
    location=models.CharField(max_length=100)
    udise_code=models.CharField(max_length=50)
    phone_number=models.IntegerField()
    landline_number=models.IntegerField()
    
    school_type_options=(
        ('aided','aided'),
        ('government','government'),
        ('private','private'),
        ('unaided','unaided')
    )
    school_type=models.CharField(max_length=50,choices=school_type_options)
    board_options=(
        ('state','state'),
        ('cbse','cbse'),
        ('icse','icse')
    )
    board=models.CharField(max_length=50,choices=board_options)
    created_date=models.DateTimeField(auto_now_add=True)
    activation_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    
    # for automatically creating registartion id
    def save(self, *args, **kwargs):
        if not self.registration_id:
            last_school = School.objects.order_by('-id').first()
            next_id = (last_school.id + 1) if last_school else 1
            self.registration_id = f"SCH-{str(next_id).zfill(4)}"
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.school_name    

class College(models.Model):
    instution_obj=models.ForeignKey(Institution,on_delete=models.CASCADE)
    registration_id = models.CharField(max_length=20, unique=True, blank=True) 
    college_name=models.CharField(max_length=100)
    address1=models.CharField(max_length=100)
    address2=models.CharField(max_length=100)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    pin_code=models.CharField(max_length=50)
    location=models.CharField(max_length=100)
    aishe_code=models.CharField(max_length=50)
    phone_number=models.IntegerField()
    landline_number=models.IntegerField()
    college_type_options=(
        ('aided','aided'),
        ('government','government'),
        ('private','private'),
        ('unaided','unaided')
    )
    college_type=models.CharField(max_length=50,choices=college_type_options)
    university_options=(
        ('kerala technical university','kerala technical university'),
        ('kannur university','kannur university'),
        ('M G university','M G university')
    )
    university=models.CharField(max_length=50,choices=university_options)
    created_date=models.DateTimeField(auto_now_add=True)
    activation_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)


    
    def save(self, *args, **kwargs):
        if not self.registration_id:    #Ensures that the ID is generated only once, i.e., when creating the record.
            last_college = College.objects.order_by('-id').first()   #This fetches the most recently created school (by id in descending order).
            next_id = (last_college.id + 1) if last_college else 1    #If a school exists, increment its id by 1. If no schools exist yet, start with 1.
            self.registration_id = f"CLG-{str(next_id).zfill(4)}"
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.college_name
    
    
class SubscriptionPackage(models.Model):
    user_obj=models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    
    INSTITUTION_TYPE_CHOICES = [
        ('school', 'School'),
        ('college', 'College'),
    ]
    institution_type = models.CharField(max_length=10, choices=INSTITUTION_TYPE_CHOICES)
    
    package_options=(('trial','trial'),('basic','basic'),
                     ('standard','standard'),('premium','premium'))
    package = models.CharField(max_length=20,choices=package_options,default="trial")
   
    description = models.TextField(blank=True)
    PLAN_CHOICES = [
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]
    plan_type = models.CharField(max_length=10, choices=PLAN_CHOICES)
    features = models.JSONField(default=list, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.package
    
    
# from datetime import timedelta
# from django.utils import timezone

# class SubscriptionPlan(models.Model):
#     PLAN_CHOICES = [
#         ('monthly', 'Monthly'),
#         ('yearly', 'Yearly'),
#     ]
#     user_obj=models.ForeignKey(UserProfile,on_delete=models.CASCADE ,null=True)
#     package_obj = models.ForeignKey(SubscriptionPackage, on_delete=models.CASCADE, related_name='packages')
#     plan_type = models.CharField(max_length=10, choices=PLAN_CHOICES)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
   

#     def __str__(self):
#         return f"{self.package_obj.package} - {self.plan_type}"

    # def save(self, *args, **kwargs):
    #     if not self.end_date:
    #         if self.plan_type == 'monthly':
    #             self.end_date = self.start_date + timedelta(days=30)
    #             self.amount_paid = self.package.price
    #         elif self.plan_type == 'yearly':
    #             self.end_date = self.start_date + timedelta(days=365)
    #             self.amount_paid = self.package.price * 12 * 0.9  # 10% discount
    #     super().save(*args, **kwargs)
    
    


class Payment(models.Model):
    user_obj = models.ForeignKey(UserProfile,on_delete=models.SET_NULL,null=True, blank=True )
    package_obj = models.ForeignKey(SubscriptionPackage,on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(blank=True, null=True)
    
    is_paid = models.BooleanField(default=False)


class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('trial_expired', 'Trial Expired'),
        ('payment_done', 'Payment Done'),
        ('payment_due', 'Payment Due'),
    )

    title = models.CharField(max_length=255)
    message = models.TextField()
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} - {self.institution}"
 


 
#here we can automatically create institution for institution admin 

@receiver(post_save, sender=UserProfile)           
def create_institution(sender, instance, created, **kwargs):
    if created and instance.role == 'institution_admin':
        Institution.objects.create(user_object=instance)


            


