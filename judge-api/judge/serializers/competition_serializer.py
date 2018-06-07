from rest_framework import serializers

from judge.models import Competition
from judge.serializers.instance_serializer import InstanceSerializer


class CompetitionSerializer(serializers.ModelSerializer):
    instances = InstanceSerializer(many=True, read_only=True)

    class Meta:
        model = Competition
        fields = '__all__'
