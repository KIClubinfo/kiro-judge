from celery import shared_task

from judge.models import Submission


def prepare_eval_data(instance, solution):
    return instance, solution


def check_solution(instance, solution):
    pass


def evaluate_solution(instance, solution) -> float:
    return 7


@shared_task
def evaluate_solution_task(submission_id: int, solution: str):
    submission = Submission.objects.get(pk=submission_id)
    instance = submission.instance
    try:
        instance, solution = prepare_eval_data(instance, solution)
        check_solution(instance, solution)
        submission.score = evaluate_solution(instance, solution)
    except Exception as ex:
        submission.error = str(ex)
    finally:
        submission.save()

    return submission.score
