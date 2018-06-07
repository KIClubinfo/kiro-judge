from rest_framework import serializers

from judge.models import Competition, Instance, Submission, Team


class InstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instance
        fields = '__all__'
