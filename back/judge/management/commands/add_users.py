import csv
from judge.models import Team
from judge.models import Competition
from django.contrib.auth import get_user_model

from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **kwargs):
        filename = kwargs['csv_file']
        User = get_user_model()

        competition = Competition.objects.get(name="KIRO 2018")
        users = []

        with open(filename, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for i, row in enumerate(reader):
                try:
                    user = User.objects.get(username=row['Adresse e-mail'])
                    user.email = row['Adresse e-mail']
                    user.set_password(row['Mot de passe'])
                    user.save()
                except User.DoesNotExist:
                    user = User.objects.create_user(
                        row['Adresse e-mail'],
                        row['Adresse e-mail'],
                        row['Mot de passe'],
                    )

                users.append(user)

                if i % 3 == 2:
                    print(row['Nom de votre équipe'])

                    try:
                        team = Team.objects.get(name=row['Nom de votre équipe'], competition=competition)
                    except Team.DoesNotExist:
                        team = Team.objects.create(name=row['Nom de votre équipe'], competition=competition)

                    team.members.set(users[-3:])
                    print(team.members.all())

