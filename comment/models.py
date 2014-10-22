from django.db import models

# Create your models here.


class Comment(models.Model):
    text = models.CharField(max_length=1000)
    parent = models.ForeignKey('Comment', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)