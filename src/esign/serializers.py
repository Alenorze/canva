from django.contrib.auth import get_user_model

from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer

from .models import Document, SignRequest, SignForm, DocumentFile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ('is_staff', 'is_active', 'date_joined', 'password',
                   'last_login', 'user_permissions', 'groups', 'is_superuser')


class DocumentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentFile
        fields = '__all__'


class DocumentSerializer(WritableNestedModelSerializer):
    files = DocumentFileSerializer(many=True)
    class Meta:
        model = Document
        fields = '__all__'


class SignFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignForm
        fields = '__all__'


class SignRequestSerializer(WritableNestedModelSerializer):
    forms = SignFormSerializer(many=True)
    class Meta:
        model = SignRequest
        fields = '__all__'
