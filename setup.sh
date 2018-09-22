#!/bin/bash

set -e

until PGPASSWORD=sesame psql -h "postgres" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up now"

# FOR NOW:
PGPASSWORD=sesame psql -h "postgres" -U "postgres" -c 'DROP DATABASE IF EXISTS explorer_dev;'
PGPASSWORD=sesame psql -h "postgres" -U "postgres" -c 'CREATE DATABASE explorer_dev;'
PGPASSWORD=sesame psql -h "postgres" -U "postgres" -c 'GRANT CONNECT ON DATABASE explorer_dev TO postgres';

mix ecto.create && mix ecto.migrate && mix phx.server
