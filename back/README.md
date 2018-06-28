## Third party requiements
`mysql` needs to run at localhost on port 3306, with database 'judge' accessible from user 'judge' with password 'judge'.

## Install
Use virtualenv :
```bash
virtualenv venv/
pip install -r requirements.txt
```

later, load virtualenv with :
```bash
source venv/bin/activate
```

## Migrate
```bash
python manage.py migrate
```

## Run
```bash
python manage.py runserver
```

## Run worker
```bash
celery -A judge_api worker -l info
```