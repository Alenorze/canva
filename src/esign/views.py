from django.views.generic import TemplateView
from django.contrib.auth import get_user_model

from rest_framework import generics, permissions, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication 

from .models import SignRequest, Document, SignForm
from .serializers import UserSerializer, DocumentSerializer, SignFormSerializer, SignRequestSerializer



class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class CreateSignRequestView(TemplateView):
    template_name = 'esign/sign_create.html'


class CreateSignDocumentView(TemplateView):
    template_name = 'esign/sign_main.html'


class ClientSignRequestView(TemplateView):
    template_name = 'esign/sign_client.html'


class UserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    model = get_user_model()

    def get_object(self, queryset=None):
        return self.request.user


class DocumentsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()

class SignRequestViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = SignRequestSerializer
    queryset = SignRequest.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        