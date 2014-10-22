# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations
from comment.models import Comment

class Migration(migrations.Migration):

    def populate(self, schema):
        c1 = Comment(id=1,text="Первый комментарий")
        c2 = Comment(id=2,text="Второй комментарий")
        c3 = Comment(id=3,text="Третий комментарий, вложенный во второй",parent=c2)
        for c in [c1,c2,c3]:
            c.save(force_insert=True)

    dependencies = [("comment", "0001_initial")]

    operations = [
        migrations.RunPython(populate)
    ]