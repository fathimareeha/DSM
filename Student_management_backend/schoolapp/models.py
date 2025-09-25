from django.db import models
from superadmin_app.models import School,UserProfile  # Adjust this import to match where UserProfile is defined
from django.contrib.auth import get_user_model



## VICEPRINCIPAL 



# class VicePrincipal(models.Model):
#     userprofile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
#     phone = models.CharField(max_length=20)
#     profile_picture = models.ImageField(upload_to='vp_profiles/', null=True, blank=True)

#     def __str__(self):
#         return self.userprofile.username

    


class Standard(models.Model):
    name = models.CharField(max_length=50)  # e.g., "1", "2", "3"

    def __str__(self):
        return f"Standard {self.name}"


# {SECTION}

class Section(models.Model):
    name = models.CharField(max_length=1)  # e.g., "A", "B"
    standard = models.ForeignKey(Standard, related_name='sections', on_delete=models.CASCADE,default=1)
    is_active = models.BooleanField(default=True)  # ✅ Active/Inactive toggle

    def __str__(self):
        return f"{self.standard.name} - {self.name}"



# ---------- Subject Model ----------
class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.code})"


# ---------- Teacher Model ----------
class Teacher(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    profilePic = models.ImageField(upload_to='teachers/', null=True, blank=True)
    standard = models.ManyToManyField(Standard, blank=True)
    section = models.ManyToManyField(Section, blank=True)
    subjects = models.ManyToManyField(Subject, blank=True)
    is_class_teacher = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} ({'Class Teacher' if self.is_class_teacher else 'Subject Teacher'})"


# ---------- Bank Model ----------
class BankAccount(models.Model):
    teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE, related_name='bank_account')
    account_name = models.CharField(max_length=150)
    account_number = models.CharField(max_length=50, unique=True)
    bank_name = models.CharField(max_length=150)
    ifsc_code = models.CharField(max_length=20)
    branch_name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.account_name} - {self.bank_name}"

    
# class SubjectAllocation(models.Model):
    
#     subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    
#     teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    
#     standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
    
#     section = models.ForeignKey(Section, on_delete=models.CASCADE)

#     class Meta:
        
#         unique_together = ('subject', 'teacher', 'standard', 'section')  # prevent duplicates

#     def __str__(self):
        
#         return f"{self.subject.name} - {self.teacher.user.get_full_name()} ({self.standard.name}-{self.section.name})"
 




##HOSTEL



class Hostel(models.Model):
    HOSTEL_TYPE_CHOICES = [
        ('Boys', 'Boys'),
        ('Girls', 'Girls'),
        ('Mixed', 'Mixed'),
    ]

    name = models.CharField(max_length=100)
    hostel_type = models.CharField(max_length=10, choices=HOSTEL_TYPE_CHOICES)
    rooms = models.IntegerField()   # ✅ renamed from total_rooms
    warden = models.CharField(max_length=100)
    address = models.TextField(null=True, blank=True)
    contact = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.hostel_type})"


##STUDENT


class Student(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    admissionNumber = models.CharField(max_length=50, unique=True, null=True, blank=True)
    rollNo = models.CharField(max_length=20, null=True, blank=True)
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
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='Male')

    # 🔗 Link student to a hostel
    hostel = models.ForeignKey(Hostel,on_delete=models.SET_NULL,   # if hostel deleted, student.hostel = NULL
        null=True, blank=True,related_name="students"
    )

    def __str__(self):
        return f"{self.studentName} ({self.admissionNumber})"
    
    
    
    
# class Student(models.Model):
    
#     GENDER_CHOICES = [
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ]
#     admissionNumber = models.CharField(max_length=50, unique=True, null=True, blank=True)
#     rollNo = models.CharField(max_length=20, null=True, blank=True)  # made nullable for migration
#     studentName = models.CharField(max_length=100, null=True, blank=True)
#     standard = models.CharField(max_length=20, null=True, blank=True)
#     section = models.CharField(max_length=10, null=True, blank=True)
#     dob = models.DateField(null=True, blank=True)
#     Email = models.EmailField(null=True, blank=True)
#     studentAddress = models.TextField(null=True, blank=True)
#     parentname = models.CharField(max_length=100, null=True, blank=True)
#     relationship = models.CharField(max_length=50, null=True, blank=True)
#     parentPhone = models.CharField(max_length=15, null=True, blank=True)
#     profilePic = models.ImageField(upload_to='student_profiles/', blank=True, null=True)
#     gender = models.CharField(
    
#     choices=GENDER_CHOICES,
#     default='Male'
# )

#     def __str__(self):
#         return f"{self.studentName} ({self.admissionNumber})"


class Book(models.Model):
  
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    category = models.CharField(max_length=50,)
    quantity = models.PositiveIntegerField(default=1)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"
    


##STAFF

class StaffRole(models.Model):
    ROLE_CHOICES = [
        ('librarian', 'Librarian'),
        ('exam_controller', 'Exam Controller'),
        ('finance_officer', 'Finance Officer'),
        ('arts_sports_coordinator', 'Arts & Sports Coordinator'),
        ('lab_coordinator', 'Lab Coordinator'),
        ('hostel_manager', 'Hostel Manager'),
    ]

    user = models.OneToOneField(
        UserProfile, 
        on_delete=models.CASCADE, 
        related_name='staff_role_profile'
    )
    staffs_role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    can_access_library = models.BooleanField(default=False)
    can_access_exam = models.BooleanField(default=False)
    can_access_finance = models.BooleanField(default=False)
    can_access_arts_sports = models.BooleanField(default=False)
    can_access_lab = models.BooleanField(default=False)
    can_access_hostel = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.staffs_role}"

    
##BUS

class Bus(models.Model):
    bus_number = models.CharField(max_length=20, unique=True)
    route_name = models.CharField(max_length=100)
    driver_name = models.CharField(max_length=100)
    driver_phone = models.CharField(max_length=15)
    capacity = models.IntegerField()

    def __str__(self):
        return f"{self.bus_number} - {self.route_name}"


class BusStop(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name="stops")
    stop_name = models.CharField(max_length=100)
    arrival_time = models.TimeField()

    def __str__(self):
        return f"{self.stop_name} ({self.bus.bus_number})"


class StudentBusAllocation(models.Model):
    student = models.OneToOneField('Student', on_delete=models.CASCADE, related_name='bus_allocation')
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    stop = models.ForeignKey(BusStop, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.student.user.get_full_name()} → {self.bus.bus_number} ({self.stop.stop_name})"
    


