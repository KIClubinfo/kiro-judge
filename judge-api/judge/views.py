import mimetypes
import os
from datetime import datetime, timezone
from django.contrib.auth.models import User
from django.http import HttpResponse
from querybuilder.fields import MinField, SimpleField, SumField
from querybuilder.query import Query
from querybuilder.tables import TableFactory
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated, NotFound, PermissionDenied
from rest_framework.response import Response

from judge.models import Competition, Instance, Submission, Team
from judge.serializers import (
    CompetitionSerializer, InstanceSerializer, SubmissionSerializer, TeamSerializer, UserSerializer,
)


def download_competition_file(competition, user, file, mimetype=None):
    if competition.id not in [competition.id for competition in user.competitions.all()]:
        raise PermissionDenied()

    print(datetime.now(tz=timezone.utc))
    print(competition.start_date)
    if datetime.now(tz=timezone.utc) < competition.start_date:
        raise PermissionDenied()

    file_path = file.path
    if not os.path.exists(file_path):
        raise NotFound()

    attachment_filename = os.path.basename(file_path)
    if mimetype is None:
        if attachment_filename is not None:
            mimetype = mimetypes.guess_type(attachment_filename)[0] or 'application/octet-stream'

        if mimetype is None:
            raise ValueError()

    with open(file_path, 'rb') as fh:
        response = HttpResponse(fh.read(), content_type=mimetype)
        response['Content-Disposition'] = 'attachment; filename=' + attachment_filename
        return response


class CompetitionViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer

    @action(methods=['get'], detail=True)
    def download(self, request, pk=None):
        competition = self.get_object()

        return download_competition_file(competition, self.request.user, competition.subject)

    @action(methods=['get'], detail=True)
    def leaderboard(self, request, pk=None):
        competition = self.get_object()

        now = datetime.now(tz=timezone.utc)
        is_frozen = competition.freeze_date <= now < competition.end_date

        team_scores_subquery = Query().from_table(Submission, [
            SimpleField('team_id', alias='sub_team_id'),
            SimpleField('instance_id', alias='instance_id'),
            MinField('score', alias='min_score'),

        ])
        team_scores_subquery.group_by('instance_id')
        team_scores_subquery.group_by('sub_team_id')

        if is_frozen:
            team_scores_subquery.where(created_at__lt=competition.freeze_date)

        team_scores_table = TableFactory(team_scores_subquery)
        print(team_scores_table.__dict__)

        query = Query().from_table(Team, [
            SimpleField('name' 'team'),
            SumField('min_score', alias='best_score')
        ])
        query.join(team_scores_table, condition='id = sub_team_id', join_type='LEFT JOIN')
        query.where(competition_id=competition.id)
        query.group_by('id')
        query.order_by('best_score', desc=False)

        print(query.get_sql())

        return Response(query.select())


class InstanceViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer

    @action(methods=['get'], detail=True)
    def download(self, request, pk=None):
        instance = self.get_object()

        return download_competition_file(instance.competition, self.request.user, instance.input_file)


class SubmissionViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = SubmissionSerializer
    queryset = Submission.objects.all()

    def create(self, request, *args, **kwargs):
        team_id = self.request.data['team']
        team = Team.objects.get(pk=team_id)
        if team.id not in [team.id for team in self.request.user.teams.all()]:
            raise PermissionDenied('Not part of this team')

        instance_id = self.request.data['instance']
        instance = Instance.objects.get(pk=instance_id)
        if datetime.now(tz=timezone.utc) < instance.competition.start_date:
            raise PermissionDenied('Competition has not started')

        if instance.competition.end_date <= datetime.now(tz=timezone.utc):
            raise PermissionDenied('Competition has ended')

        return super().create(request, *args, **kwargs)


class TeamViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


class UserViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        if pk == 'me':
            if self.request.auth is None:
                raise NotAuthenticated()

            return self.request.user
        else:
            return super().get_object()
