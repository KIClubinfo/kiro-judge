from django.contrib.auth.models import User
from django.db import models


def competition_subject_path(competition, filename):
    return 'competitions/{0}/{1}'.format(competition.id, filename)


class Competition(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=500)
    description = models.TextField()

    subject = models.FileField(upload_to=competition_subject_path)

    start_date = models.DateTimeField()
    freeze_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return self.name


def competition_instance_path(instance, filename):
    return 'competitions/{0}/instances/{1}'.format(instance.competition.id, filename)


class Instance(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=500)
    description = models.TextField()

    input_file = models.FileField(upload_to=competition_instance_path)

    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='instances')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('id',)


class Team(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=500)

    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='teams')

    def __str__(self):
        return self.name


class Submission(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    score = models.FloatField(blank=True, null=True)
    error = models.TextField(blank=True, null=True)

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='submissions')
    instance = models.ForeignKey(Instance, on_delete=models.PROTECT)

    def __str__(self):
        return "{} - {} - {}".format(self.instance.competition.name, self.team.name, self.created_at)




