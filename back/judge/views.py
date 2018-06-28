import mimetypes
import os
from datetime import datetime, timezone
from django.contrib.auth.models import User
from django.http import HttpResponse
from querybuilder.fields import MaxField, SimpleField, SumField
from querybuilder.query import Query
from rest_framework import mixins, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated, NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from judge.models import Competition, Instance, Submission, Team
from judge.serializers import (
    CompetitionSerializer, InstanceSerializer, SubmissionSerializer, TeamSerializer, UserSerializer,
)


class IsCompetitionParticipant(permissions.BasePermission):
    message = 'Not a participant of this competition'

    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Competition):
            return self.is_competition_participant(obj, request.user)
        if isinstance(obj, Instance):
            return self.is_competition_participant(obj.competition, request.user)

        return False

    @staticmethod
    def is_competition_participant(competition, user):
        for team in user.teams.all():
            if competition.id == team.competition.id:
                return True

        return False


def download_competition_file(competition, file, mimetype=None):
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


class CoalescedSumField(SumField):

    def get_sql(self):
        sql = 'COALESCE({0}, 0)'.format(self.get_select_sql())

        alias = self.get_alias()
        if alias:
            return '{0} AS "{1}"'.format(sql, alias)

        return sql


class CompetitionViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = (IsAuthenticated, IsCompetitionParticipant)

    @action(methods=['get'], detail=True)
    def download(self, request, pk=None):
        competition = self.get_object()

        return download_competition_file(competition, competition.subject)

    @action(methods=['get'], detail=True)
    def leaderboard(self, request, pk=None):
        competition = self.get_object()

        now = datetime.now(tz=timezone.utc)
        is_frozen = competition.freeze_date <= now < competition.end_date

        team_scores_subquery = Query().from_table(Submission, [
            SimpleField('team_id', alias='sub_team_id'),
            SimpleField('instance_id', alias='instance_id'),
            MaxField('score', alias='max_score'),

        ])
        team_scores_subquery.group_by('instance_id')
        team_scores_subquery.group_by('sub_team_id')

        if is_frozen:
            team_scores_subquery.where(created_at__lt=competition.freeze_date)

        query = Query().from_table(Team, [
            SimpleField('name'),
        ])
        query.with_query(team_scores_subquery, alias='team_scores')
        query.join(
            'team_scores',
            condition='id = sub_team_id', join_type='LEFT JOIN',
            fields=[
                CoalescedSumField('max_score', alias='best_score'),
            ],
        )
        query.where(competition_id=competition.id)
        query.group_by('id')
        query.order_by('best_score', desc=True)

        results = query.select()

        leaderboard = [
            dict(
                res,
                rank=rank,
            )
            for rank, res in enumerate(results, 1)
        ]

        print(results)

        return Response(leaderboard)


class InstanceViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer
    permission_classes = (IsAuthenticated, IsCompetitionParticipant)

    @action(methods=['get'], detail=True)
    def download(self, request, pk=None):
        instance = self.get_object()

        return download_competition_file(instance.competition, instance.input_file)


class SubmissionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
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
