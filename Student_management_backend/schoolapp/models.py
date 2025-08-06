from django.db import models



from superadmin_app.models import School,UserProfile  # Adjust this import to match where UserProfile is defined




##VICEPRINCIPAL

class VicePrincipal(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)  # Each vice principal has one user
    phone = models.CharField(max_length=15)
    school = models.ForeignKey(School,on_delete=models.CASCADE,related_name='vice_principals',null=True,blank=True)

    def __str__(self):
        return f"Vice Principal: {self.user.username} - {self.school.name if self.school else 'No school'}"

class Section(models.Model):
    name = models.CharField(max_length=10, unique=True)  # e.g., A, B, C

    def __str__(self):
        return self.name


class Standard(models.Model):
    name = models.CharField(max_length=50)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    sections = models.ManyToManyField(Section, blank=True)  # ✅ Dropdown/multiselect
    
    def __str__(self):
        return f"{self.name} ({self.school.name})"

    ##SUBJECTS
    
class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True, null=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='subjects')

    def __str__(self):
        return f"{self.name} ({self.code}) - {self.school.school_name}"
    
       
    ##TEACHERS
    
class Teacher(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='teachers')
    subject = models.CharField(max_length=100)
    qualification = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Teacher: {self.user.username} - {self.subject}"
    
    
    
    
    
    
#     from superadmin_app.models import College, UserProfile
# from django.db import models

# class Department(models.Model):
#     name = models.CharField(max_length=100)
#     college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='departments')


#     class Meta:
#         unique_together = ('name',)  

#     def __str__(self):
#         return f"{self.name} ({self.code})"
    

# class HOD(models.Model):
#     user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
#     phone = models.CharField(max_length=15)
#     department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='hods')
#     college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='hods')

#     class Meta:
#         unique_together = ('college', 'department')

#     def __str__(self):
#         return f"HOD: {self.user.username} - {self.college.college_name if self.college else 'no college'}"



# class Faculty(models.Model):
#     user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
#     phone = models.CharField(max_length=15)
#     department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="faculties")
#     college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='faculties')
#     designation = models.CharField(max_length=100, null=True, blank=True)

#     def __str__(self):
#         return f"{self.name} - {self.department.name}"




# class Semester(models.Model):
#     name = models.CharField(max_length=50)  # e.g., "Semester 1"
#     department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='semesters')

#     def __str__(self):
#         return f"{self.department.code} - {self.name}"
    

# class Subject(models.Model):
#     name = models.CharField(max_length=100)
#     code = models.CharField(max_length=20, unique=True)
#     semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='subjects')

#     def __str__(self):
#         return f"{self.name} ({self.code})"



# class SubjectAllocation(models.Model):
#     faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='allocations')
#     subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='allocations')
#     semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    

#     def __str__(self):
#         return f"{self.faculty.name} - {self.subject.name} ({self.semester.name})"