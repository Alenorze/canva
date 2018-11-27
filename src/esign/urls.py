from django.urls import include, path

from rest_framework import routers

from .views import CreateSignRequestView, CreateSignDocumentView, UserView, SignRequestViewSet, DocumentsViewSet, ClientSignRequestView



router = routers.DefaultRouter()
router.register('request', SignRequestViewSet, base_name='sign_request')
router.register('documents', DocumentsViewSet, base_name='documents')

app_name = 'esign'

urlpatterns = [
    path('create/', CreateSignRequestView.as_view(), name='create_sign_form'),
    path('client/', ClientSignRequestView.as_view(), name='client_sing_document'),
    path('', CreateSignDocumentView.as_view(), name='create_sing_request'),
    path('api/user/', UserView.as_view(), name='user'),
    path('api/', include(router.urls)),
]
