import mimetypes
import os
from datetime import datetime, timezone
from django.contrib.auth.models import User
from django.http import HttpResponse
from querybuilder.fields import MinField, SimpleField, SumField
from querybuilder.query import Query
from querybuilder.tables import Table, ModelTable
from rest_framework import mixins, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated, NotFound, ValidationError
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
        if isinstance(obj, Instance) or isinstance(obj, Submission):
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
        raise ValidationError()

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


class ProductTable(Table):
    def init_defaults(self):
        """
        Sets a query instance variable to the table value
        """
        super(ProductTable, self).init_defaults()
        self.models = {
            key: ModelTable(val, alias=key)
            for key, val in self.table.items()
        }

    def get_sql(self):
        return ','.join([
            model.get_sql()
            for model in self.models.values()
        ])

class UnionTable(Table):
    def init_defaults(self):
        """
        Sets a query instance variable to the table value
        """
        super(UnionTable, self).init_defaults()

    def get_sql(self):
        full_query = ' UNION ALL '.join([
            'SELECT * FROM ({}) AS "{}"'.format(table.get_sql(), 'tototo' + str(i))
            for i, table in enumerate(self.table)
        ])
        return '({0}) AS "{1}"'.format(full_query, 'tototo')


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

        # ============================================================= #

        team_scores_subquery = Query().from_table(Submission, [
            SimpleField('team_id', alias='sub_team_id'),
            SimpleField('instance_id', alias='instance_id'),
            SimpleField('score', alias='score'),
        ])
        # FIXME Nonsense if multiple competitions
        # team_scores_subquery.where(competition_id=competition.id)

        if is_frozen:
            team_scores_subquery.where(created_at__lt=competition.freeze_date)

        # ============================================================= #

        instance_base_score_subquery = Query().from_table(ProductTable(dict(
            team=Team,
            instance=Instance,
        )), [
            SimpleField('team.id', alias='sub_team_id'),
            SimpleField('instance.id', alias='instance_id'),
            SimpleField('instance.base_score', alias='score'),
        ])
        # FIXME Nonsense if multiple competitions
        # instance_base_score_subquery.where(competition_id=competition.id)

        # ============================================================= #

        team_full_scores_subquery = Query().from_table(
            UnionTable([team_scores_subquery, instance_base_score_subquery]),
            [
                SimpleField('sub_team_id'),
                SimpleField('instance_id'),
                MinField('score', alias='min_score'),
            ],
        )
        team_full_scores_subquery.group_by('instance_id')
        team_full_scores_subquery.group_by('sub_team_id')

        # ============================================================= #

        query = Query().from_table(Team, [
            SimpleField('name'),
        ])
        query.with_query(team_full_scores_subquery, alias='team_scores')
        query.join(
            'team_scores',
            condition='id = sub_team_id', join_type='LEFT JOIN',
            fields=[
                CoalescedSumField('min_score', alias='best_score'),
            ],
        )
        query.where(competition_id=competition.id)
        query.group_by('id')
        query.order_by('best_score', desc=False)

        # ============================================================= #
        # print(team_scores_subquery.format_sql())
        # print(instance_base_score_subquery.format_sql())
        # print(team_full_scores_subquery.format_sql())
        # print(query.format_sql())
        # ============================================================= #

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
    permission_classes = (IsAuthenticated, IsCompetitionParticipant)

    def create(self, request, *args, **kwargs):
        team_id = self.request.data['team']
        team = Team.objects.get(pk=team_id)
        if team.id not in [team.id for team in self.request.user.teams.all()]:
            raise ValidationError('Not part of this team')

        instance_id = self.request.data['instance']
        instance = Instance.objects.get(pk=instance_id)
        if datetime.now(tz=timezone.utc) < instance.competition.start_date:
            raise ValidationError('Competition has not started')

        if instance.competition.end_date <= datetime.now(tz=timezone.utc):
            raise ValidationError('Competition has ended')

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
