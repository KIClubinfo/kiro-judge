from celery import shared_task

from judge.models import Submission, Instance

import judge.competition2018.evaluate as evaluate2018


def prepare_eval_data(instance: Instance, solution_str: str):
    instance_file = instance.input_file
    return evaluate2018.prepare_eval_data(instance_file, solution_str)


def check_solution(eval_data):
    evaluate2018.check_solution(*eval_data)


def evaluate_solution(eval_data) -> float:
    return evaluate2018.evaluate_solution(*eval_data)


@shared_task
def evaluate_solution_task(submission_id: int, solution: str):
    submission = Submission.objects.get(pk=submission_id)
    instance = submission.instance
    try:
        eval_data = prepare_eval_data(instance, solution)
        check_solution(eval_data)
        submission.score = evaluate_solution(eval_data)
    except Exception as ex:
        submission.error = str(ex)
    finally:
        submission.save()

    return submission.score
