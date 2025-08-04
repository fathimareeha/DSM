# from superadmin_app.models import College, UserProfile  # ✅ Correct import
# from django.db import models

# class HOD(models.Model):
#     DEPARTMENT_CHOICES = [
#         ("CSE", "Computer Science"),
#         ("ECE", "Electronics"),
#         ("ME", "Mechanical"),
#         ("CE", "Civil"),
#         ("EEE", "Electrical"),
#     ]

#     user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)  # ✅ use UserProfile here
#     name=models.CharField(max_length=100,null=True)
#     email = models.EmailField()
#     phone = models.CharField(max_length=15)
#     department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
#     college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='hods',null=True,)

#     def __str__(self):
#         return f"HOD: {self.user.username} - {self.department}"




from superadmin_app.models import College, UserProfile
from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='departments')


    class Meta:
        unique_together = ('name',)  

    def __str__(self):
        return f"{self.name} ({self.code})"


# class HOD(models.Model):
#     DEPARTMENT_CHOICES = [
#         ("CSE", "Computer Science"),
#         ("ECE", "Electronics"),
#         ("ME", "Mechanical"),
#         ("CE", "Civil"),
#         ("EEE", "Electrical"),
#     ]

#     user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100, null=True)
#     email = models.EmailField()
#     phone = models.CharField(max_length=15)
#     department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
#     college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='hods', null=True)

#     class Meta:
#         unique_together = ('college', 'department')  # ✅ Enforces one HOD per department per college

#     def __str__(self):
#         return f"HOD: {self.user.username} - {self.department}"


class HOD(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='hods')
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='hods')

    class Meta:
        unique_together = ('college', 'department')

    def __str__(self):
        return f"HOD: {self.name} - {self.department.name}"
