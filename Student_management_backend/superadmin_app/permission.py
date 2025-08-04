from rest_framework import permissions
from superadmin_app.models import StaffRole 

class IsInstitutionAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role == 'institution_admin'
        )

class IsSuperadminOrStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and (
                request.user.is_superuser or
                (hasattr(request.user, 'role') and request.user.role == 'staff')
            )
        )
        
        
class IsSuperadminOrReadOnlyForStaff(permissions.BasePermission):
    """
    - Superadmin: Full access (GET, POST, PUT, DELETE)
    - Staff: Read-only (GET)
    """

    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        # Superuser: allow all actions
        if user.is_superuser:
            return True

        # Staff: allow only safe (read-only) methods
        if hasattr(user, 'role') and user.role == 'staff':
            return request.method in permissions.SAFE_METHODS

        return False
    
    
class IsSuperAdminOrSchoolManager(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False

        # If the user is a superadmin
        if user.is_superuser:
            return True

        # Try to access the user's StaffRole
        try:
            staff_role = user.staff_role  # from related_name='staff_role'
        except StaffRole.DoesNotExist:
            return False

        # Either match role or use boolean flag
        return staff_role.staff_role == 'school_manager' or staff_role.can_access_school
    
    
class IsSuperAdminOrCollegeManager(permissions.BasePermission):
        def has_permission(self, request, view):
            user = request.user

            if not user.is_authenticated:
                return False

            # If the user is a superadmin
            if user.is_superuser:
                return True

            # Try to access the user's StaffRole
            try:
                staff_role = user.staff_role  # from related_name='staff_role'
            except StaffRole.DoesNotExist:
                return False

            # Either match role or use boolean flag
            return staff_role.staff_role == 'college_manager' or staff_role.can_access_college
        
        
        
class IsSuperAdminOrPackageManager(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False
        
        if request.method in permissions.SAFE_METHODS:
            return True

        # If the user is a superadmin
        if user.is_superuser:
            return True

        # Try to access the user's StaffRole
        try:
            staff_role = user.staff_role  # from related_name='staff_role'
        except StaffRole.DoesNotExist:
            return False

        # Either match role or use boolean flag
        return staff_role.staff_role == 'package_manager' or staff_role.can_access_package