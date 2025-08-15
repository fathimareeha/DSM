
from superadmin_app.models import College, UserProfile
from django.db import models
from superadmin_app.models import Department,Course,Semester


class HOD(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.IntegerField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='hods')
    
    class Meta:
        unique_together = ( 'department',)

    def __str__(self):
        return f"HOD: {self.user.username} "



class Faculty(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.IntegerField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="faculties")
    
    def __str__(self):
        return f"{self.user.username} "
    
class Hostel(models.Model):
    HOSTEL_TYPE_CHOICES = [
        ('Boys', 'Boys'),
        ('Girls', 'Girls'),
        
    ]

    name = models.CharField(max_length=100)  # Hostel Name
    hostel_type = models.CharField(max_length=10, choices=HOSTEL_TYPE_CHOICES)  # Hostel Type
    intake = models.IntegerField()  # Total capacity
    address = models.TextField(null=True, blank=True)  # Address

    def __str__(self):
        return f"{self.name} ({self.hostel_type})"


class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.IntegerField()
    roll_no = models.CharField(max_length=20)  # changed to CharField for flexibility
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="students")
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='student_photos/',null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES,null=True, blank=True)
    # Hostel details
    hostel = models.ForeignKey(Hostel, on_delete=models.SET_NULL, null=True, blank=True)
    room_number = models.CharField(max_length=10, null=True, blank=True)



    def __str__(self):
        return f"Student: {self.user.username} ({self.roll_no})"

    class Meta:
        unique_together = ('roll_no', 'department')  # optional constraint


class CoordinatorsRole(models.Model):
    ROLE_CHOICES = [
        ('librarian', 'librarian'),
        ('controller_of_exam', 'controller_of_exam'),
        ('finance_officer', 'finance_officer'),
        ('placement_officer','placement_officer'),
        ('sports_coordinator','sports_coordinator'),
        ('lab_coordinator','lab_coordinator'),
        ('hostel_manager','hostel_manager'),
    ]

    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE , related_name='coordinators_role')
    coordinators_role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    can_access_library = models.BooleanField(default=False)
    can_access_exam = models.BooleanField(default=False)
    can_access_finance = models.BooleanField(default=False)
    can_access_placement = models.BooleanField(default=False)
    can_access_sports = models.BooleanField(default=False)
    can_access_lab = models.BooleanField(default=False)
    can_access_hostel = models.BooleanField(default=False)



    def __str__(self):
        return f"{self.user.username} - {self.coordinators_role}"   





class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13, unique=True)
    category = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=1)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    



from django.db import models

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


