#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py flush --no-input
python manage.py migrate
python manage.py loaddata app/fixture/provincia.json
python manage.py loaddata app/fixture/hospital.json
python manage.py loaddata app/fixture/medico.json
python manage.py loaddata app/fixture/paciente.json
python manage.py loaddata app/fixture/recurso.json

exec "$@"
