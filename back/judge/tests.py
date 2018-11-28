# Create your tests here.

import base64

from datetime import datetime, timedelta
from django.urls import reverse
from django.test import TestCase
from django.contrib.auth import get_user_model


from judge.models import Competition, Instance, Submission, Team

class CompetitionViewSetTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        cls.user = User.objects.create_user('admin', 'admin@example.com', 'password')

        cls.competition = Competition.objects.create(
            start_date=datetime.now() - timedelta(hours=1),
            end_date=datetime.now() + timedelta(hours=6),
            freeze_date=datetime.now() + timedelta(hours=5),
        )

        instance_1 = Instance.objects.create(base_score=100, competition=cls.competition)
        instance_2 = Instance.objects.create(base_score=200, competition=cls.competition)
        instance_3 = Instance.objects.create(base_score=400, competition=cls.competition)
        instance_4 = Instance.objects.create(base_score=None, competition=cls.competition)

        best_team = Team.objects.create(name="BestTeam", competition=cls.competition)

        Submission.objects.create(team=best_team, instance=instance_1, score=1)
        Submission.objects.create(team=best_team, instance=instance_2, score=2)
        Submission.objects.create(team=best_team, instance=instance_3, score=4000)
        Submission.objects.create(team=best_team, instance=instance_2, score=None, error='error')

        cls.team = Team.objects.create(name="IdleTeam", competition=cls.competition)
        cls.team.members.set([cls.user])

    def setUp(self):
        credentials = base64.b64encode('admin:password'.encode("utf-8"))
        self.client.defaults['HTTP_AUTHORIZATION'] = 'Basic ' + credentials.decode("utf-8")

    def test_leaderboard(self):
        response = self.client.get(reverse('competition-leaderboard', kwargs=dict(pk=self.competition.id)))
        self.assertEqual(response.status_code, 200)
        self.fail()
