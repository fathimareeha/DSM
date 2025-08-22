from django.db import models
from superadmin_app.models import School,UserProfile  # Adjust this import to match where UserProfile is defined
from django.contrib.auth import get_user_model



## VICEPRINCIPAL 



class VicePrincipal(models.Model):
    userprofile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    profile_picture = models.ImageField(upload_to='vp_profiles/', null=True, blank=True)

    def __str__(self):
        return self.userprofile.username


class Section(models.Model):
    
    name = models.CharField(max_length=10, unique=True)  # e.g., A, B, C

    def __str__(self):
        
        return self.name


class Standard(models.Model):
    
    name = models.CharField(max_length=50)
    
    
    sections = models.ManyToManyField(Section, blank=True)  # ✅ Dropdown/multiselect
    
    
    def __str__(self):
        
        return f"{self.name}"
    

# class SectionAllocation(models.Model):
#     standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
#     section = models.ForeignKey(Section, on_delete=models.CASCADE)
#     academic_year = models.CharField(max_length=9)  # e.g., "2025-2026"
#     class_teacher = models.ForeignKey(
#         UserProfile,
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name="class_teacher_allocations"
#     )
#     capacity = models.PositiveIntegerField(default=0)  # Optional

#     class Meta:
#         unique_together = ('standard', 'section', 'academic_year')
#         verbose_name = "Section Allocation"
#         verbose_name_plural = "Section Allocations"

#     def __str__(self):
#         return f"{self.standard} - {self.section} ({self.academic_year})"
    
    
    ## TEACHERS ##
class Teacher(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    gender = models.CharField(
    
    choices=GENDER_CHOICES,
    default='Male'
)

    def __str__(self):
        return f"{self.user.username} "



    ## SUBJECTS ##
    
class Subject(models.Model):
    
    name = models.CharField(max_length=100)
    
    code = models.CharField(max_length=20, unique=True)
        

    def __str__(self):
        
        return f"{self.name} ({self.code}) "


class SubjectAllocation(models.Model):
    
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
    
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    class Meta:
        
        unique_together = ('subject', 'teacher', 'standard', 'section')  # prevent duplicates

    def __str__(self):
        
        return f"{self.subject.name} - {self.teacher.user.get_full_name()} ({self.standard.name}-{self.section.name})"
 


class Student(models.Model):
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    admissionNumber = models.CharField(max_length=50, unique=True, null=True, blank=True)
    rollNo = models.CharField(max_length=20, null=True, blank=True)  # made nullable for migration
    studentName = models.CharField(max_length=100, null=True, blank=True)
    standard = models.CharField(max_length=20, null=True, blank=True)
    section = models.CharField(max_length=10, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    Email = models.EmailField(null=True, blank=True)
    studentAddress = models.TextField(null=True, blank=True)
    parentname = models.CharField(max_length=100, null=True, blank=True)
    relationship = models.CharField(max_length=50, null=True, blank=True)
    parentPhone = models.CharField(max_length=15, null=True, blank=True)
    profilePic = models.ImageField(upload_to='student_profiles/', blank=True, null=True)
    gender = models.CharField(
    
    choices=GENDER_CHOICES,
    default='Male'
)

    def __str__(self):
        return f"{self.studentName} ({self.admissionNumber})"


class Book(models.Model):
  
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    category = models.CharField(max_length=50,)
    quantity = models.PositiveIntegerField(default=1)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"
    
from django.db import models
from django.conf import settings

class CoordinatorsRole(models.Model):
    ROLE_CHOICES = [
        ('librarian', 'Librarian'),
        ('controller_of_exam', 'Controller of Exam'),
        ('finance_officer', 'Finance Officer'),
        ('transport_officer', 'Transport Officer'),
        ('arts&sports_coordinator', 'Arts&Sports Coordinator'),
        ('lab_coordinator', 'Lab Coordinator'),
        ('hostel_manager', 'Hostel Manager'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='coordinator_role'
    )
    coordinators_role = models.CharField(
        max_length=50, choices=ROLE_CHOICES
    )

    # Access permissions
    can_access_library = models.BooleanField(default=False)
    can_access_exam = models.BooleanField(default=False)
    can_access_finance = models.BooleanField(default=False)
    can_access_transport = models.BooleanField(default=False)
    can_access_arts_sports = models.BooleanField(default=False)
    can_access_lab = models.BooleanField(default=False)
    can_access_hostel = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Coordinator Role"
        verbose_name_plural = "Coordinator Roles"

    def __str__(self):
        return f"{self.user.username} - {self.get_coordinators_role_display()}"

