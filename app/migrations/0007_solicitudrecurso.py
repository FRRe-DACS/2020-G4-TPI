# Generated by Django 3.0.6 on 2020-05-28 18:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20200528_1723'),
    ]

    operations = [
        migrations.CreateModel(
            name='SolicitudRecurso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('motivo', models.CharField(blank=True, max_length=100, null=True)),
                ('detalle', models.TextField(blank=True, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_respuesta', models.DateTimeField(blank=True, null=True)),
                ('estado', models.CharField(choices=[('A', 'Aprobada'), ('P', 'Pendiente'), ('R', 'Rechazada')], default='P', max_length=1)),
                ('respuesta', models.TextField(blank=True, null=True)),
                ('hospital', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='solicitudes', to='app.Hospital')),
                ('recursos', models.ManyToManyField(related_name='solicitudes', to='app.Recurso')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
