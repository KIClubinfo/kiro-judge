# kiro-judge
Judge system for KIRO competition

## Install

### Install dependencies

You will need `docker-compose`, powered by `docker`.

You can install Docker Community Edition (free) following steps described here : https://docs.docker.com/install/

### Install Judge System

Copy from repository
```bash
git clone https://github.com/KIClubinfo/kiro-judge.git
```

Go into downloaded folder
```bash
cd kiro-judge
```

Build the application
```bash
docker-compose build
```
this will take a while.

This previous step might fail if you :
* do not have the `docker` daemon running (then start docker service)
* if the user is not in the `docker` usergroup (in which case you need to use `sudo`)

## Run application

Start the application
```bash
docker-compose up -d
```

Stop the application
```bash
docker-compose down
```

(Again, you might want to use `sudo`)

## Configure

The application has to be running in order to configure the competition.

### Add a super user

In order to setup the competitions, you will need to log in the admin panel thanks to a *super user account*.

To create a super user :
```bash
docker-compose exec back /venv/bin/python manage.py createsuperuser
```
and follow the steps asked.

### Setup a competition

Go into the admin panel at the url `http://localhost:8000/admin/`.

Log in with a super user account previously created.

To setup a competition you need to :
1. Create a competition
2. Create all user accounts
3. Create teams

Simply click on "Add" for each element and fill the information as suggested.

**Be careful, all users must have their first name, last name and email specified for everything to work !**

## Deploy

You can deploy this application on a web server, proxy with `nginx`, use a DNS to point a domain name to your server.

Many ressources on the Internet are available if you need any help to do that.


