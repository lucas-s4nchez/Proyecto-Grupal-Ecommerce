from django.db import models
from simple_history.models import HistoricalRecords
# Create your models here.

class BaseModel(models.Model):

    id = models.AutoField(primary_key=True)
    state = models.BooleanField("estado", default=True)
    created_date = models.DateField("fecha de creacion", auto_now_add=True, auto_now=False)
    modified_date = models.DateField("fecha modificacion", auto_now_add=False, auto_now=True)
    deleted_date = models.DateField("fecha eliminacion", auto_now_add=False, auto_now=True)
    historical= HistoricalRecords(inherit=True)

    @property
    def _history_user(self):
        return self.changed_by
    
    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        abstract = True
        verbose_name = "Modelo Base"
        verbose_name_plural = "Modelos Base"

    