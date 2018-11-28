import pandas as pd
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
        dataUsers = pd.read_csv(filename)

        competition = Competition.objects.get(name="KIRO 2018")

        users = []
        for i in range(len(dataUsers)):
            try:
                user = User.objects.get(username=dataUsers['Adresse e-mail'][i])
                user.email = dataUsers['Adresse e-mail'][i]
                user.set_password(dataUsers['Mot de passe'][i])
                user.save()
            except User.DoesNotExist:
                user = User.objects.create_user(
                    dataUsers['Adresse e-mail'][i],
                    dataUsers['Adresse e-mail'][i],
                    dataUsers['Mot de passe'][i],
                )

            users.append(user)

            if i % 3 == 2:
                print(dataUsers['Nom de votre équipe'][i])

                try:
                    team = Team.objects.get(name=dataUsers['Nom de votre équipe'][i], competition=competition)
                except Team.DoesNotExist:
                    team = Team.objects.create(name=dataUsers['Nom de votre équipe'][i], competition=competition)

                team.members.set(users[-3:])
                print(team.members.all())

