from django.contrib.auth.models import User
from rest_framework import serializers

from judge.models import Team
from judge.serializers import CompetitionSerializer, SubmissionSerializer, UserSerializer


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)


class TeamSerializer(serializers.ModelSerializer):
    competition = serializers.PrimaryKeyRelatedField(read_only=True)
    members = MemberSerializer(many=True, read_only=True)
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = '__all__'
