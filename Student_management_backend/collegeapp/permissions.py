# collegeapp/permissions.py

from rest_framework import permissions

class IsInstitutionAdmin(permissions.BasePermission):
    """
    Allows access only to users with role = 'institution_admin'.
    """

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.role == 'institution_admin')


class IsStaff(permissions.BasePermission):
    """
    Allows access only to users with role = 'staff'.
    """

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.role == 'staff')



# events/permissions.py
from rest_framework import permissions


class IsPrincipal(permissions.BasePermission):
    """
    Custom permission: only institution_admin (principal) can create events.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "institution_admin"
