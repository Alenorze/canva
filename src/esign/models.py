from django.db import models
from jsonfield import JSONField
from django.contrib.auth.models import AbstractUser
from django.conf import settings



class SignForm(models.Model):
    name = models.CharField(max_length=256, blank=True, null=True)
    email = models.CharField(max_length=256, blank=True, null=True)
    company = models.CharField(max_length=256, blank=True, null=True)


class SignRequest(models.Model):
    agent = JSONField(blank=True, null=True)
    result = JSONField(blank=True, null=True)
    forms = models.ManyToManyField(SignForm)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)


class DocumentFile(models.Model):   
    file = models.FileField(blank=True, null=True)
    

class Document(models.Model):
    name = models.CharField(max_length=256, blank=True, null=True)
    files = models.ManyToManyField(DocumentFile)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)

