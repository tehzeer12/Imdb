# Generated by Django 3.2.6 on 2021-12-14 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_list'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='front_pic',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
    ]
