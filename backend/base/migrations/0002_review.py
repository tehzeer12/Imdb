# Generated by Django 3.2.6 on 2021-12-12 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('product_id', models.IntegerField(blank=True, default=0, null=True)),
                ('user_id', models.IntegerField(blank=True, default=0, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
    ]
