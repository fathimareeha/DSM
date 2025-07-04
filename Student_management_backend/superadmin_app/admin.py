from django.contrib import admin

from superadmin_app.models import SubscriptionPackage,Payment
# Register your models here.

admin.site.register(SubscriptionPackage)

admin.site.register(Payment)

