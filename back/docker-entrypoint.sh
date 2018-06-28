#!/bin/sh
set -e

until psql $DATABASE_URL -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - continuing"

if [ "x$DJANGO_MANAGEPY_MIGRATE" = 'x1' ]; then
    /venv/bin/python manage.py migrate --noinput
fi

if [ "x$DJANGO_MANAGEPY_COLLECTSTATIC" = 'x1' ]; then
    /venv/bin/python manage.py collectstatic --noinput
fi

exec "$@"