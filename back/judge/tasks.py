import traceback, sys
from celery import shared_task

from judge.models import Submission, Instance

import judge.competition2018.evaluate as evaluate2018


def prepare_eval_data(instance: Instance, solution_str: str):
    instance_file = instance.input_file
    return evaluate2018.prepare_eval_data(instance_file, solution_str)


def check_solution(instance, solution):
    evaluate2018.check_solution(instance, solution)


def evaluate_solution(instance, solution) -> float:
    return evaluate2018.evaluate_solution(instance, solution)


@shared_task
def evaluate_solution_task(submission_id: int, solution_str: str):
    submission = Submission.objects.get(pk=submission_id)
    try:
        instance, solution = prepare_eval_data(submission.instance, solution_str)
        check_solution(instance, solution)
        submission.score = evaluate_solution(instance, solution)
    except Exception as ex:
        traceback.print_exc(file=sys.stdout)
        submission.error = str(ex)
    finally:
        submission.save()

    return submission.score
