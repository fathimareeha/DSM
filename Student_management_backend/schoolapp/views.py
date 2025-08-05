from django.db import models
from rest_framework import generics, permissions
from .models import VicePrincipal
from .serializer import VicePrincipalCreateSerializer,VicePrincipalDetailSerializer



# class VicePrincipalCreateListView(generics.ListCreateAPIView):
#     queryset = VicePrincipal.objects.all()
#     serializer_class = VicePrincipalCreateSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return VicePrincipalCreateSerializer
#         return VicePrincipalCreateSerializer

# views.py

class VicePrincipalCreateListView(generics.ListCreateAPIView):
    queryset = VicePrincipal.objects.select_related('user', 'school').all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VicePrincipalCreateSerializer
        return VicePrincipalDetailSerializer
