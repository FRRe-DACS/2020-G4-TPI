# Generated by Django 3.0.6 on 2020-05-21 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_recurso'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recurso',
            name='cantidad',
            field=models.IntegerField(default=0, help_text='Stock disponible del recurso'),
        ),
        migrations.AlterField(
            model_name='recurso',
            name='descripcion',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='recurso',
            name='estado',
            field=models.BooleanField(default=False, help_text='Si hay disponibilidad o no del recurso'),
        ),
    ]