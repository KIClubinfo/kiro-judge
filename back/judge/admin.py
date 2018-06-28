from django.contrib import admin

from judge.models import Competition, Instance, Submission, Team


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):
    pass


@admin.register(Instance)
class InstanceAdmin(admin.ModelAdmin):
    pass


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    pass

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    pass
