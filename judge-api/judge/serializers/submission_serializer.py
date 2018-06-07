from rest_framework import serializers

from judge.models import Instance, Submission, Team


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'
        depth = 1

    def create(self, validated_data, *args, **kwargs):
        instance_id = validated_data.pop('instance_id')
        team_id = validated_data.pop('team_id')
        solution = validated_data.pop('solution')

        team = Team.objects.get(pk=team_id)
        instance = Instance.objects.get(pk=instance_id)
        submission = Submission.objects.create(instance=instance, team=team, **validated_data)
        return submission

    def to_internal_value(self, data):
        internal_value = super().to_internal_value(data)
        internal_value['instance_id'] = data['instance']
        internal_value['team_id'] = data['team']
        internal_value['solution'] = data.get('solution', '')
        return internal_value
