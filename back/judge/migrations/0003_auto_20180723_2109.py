# Generated by Django 2.0.7 on 2018-07-23 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('judge', '0002_auto_20180607_1323'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='instance',
            options={'ordering': ('id',)},
        ),
        migrations.RemoveField(
            model_name='instance',
            name='initial_score',
        ),
    ]
