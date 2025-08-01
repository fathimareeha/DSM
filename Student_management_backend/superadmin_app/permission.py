from rest_framework import permissions

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