from django.contrib import admin

from .models import Document, SignRequest, SignForm, DocumentFile

admin.site.register(Document)
admin.site.register(SignRequest)
admin.site.register(SignForm)
admin.site.register(DocumentFile)
