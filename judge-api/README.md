## Install
```bash
virtualenv venv/
pip install -r requirements.txt
```

## Run
```bash
python manage.py runserver
```

## Run worker
```bash
celery -A judge_api worker -l info
```