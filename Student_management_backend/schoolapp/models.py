from django.db import models
from superadmin_app.models import School,UserProfile  # Adjust this import to match where UserProfile is defined


class VicePrincipal(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)  # Each vice principal has one user
    phone = models.CharField(max_length=15)
    school = models.ForeignKey(School,on_delete=models.CASCADE,related_name='vice_principals',null=True,blank=True)

    def __str__(self):
        return f"Vice Principal: {self.user.username} - {self.school.name if self.school else 'No school'}"
