import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instance } from '../entities/instance.entity';
import { Submission } from '../entities/submission.entity';
import { Team } from '../entities/team.entity';
import { checkSolution, evaluateSolution } from '../evaluation/evaluation';
import { KiroInstance } from '../evaluation/kiro-instance';
import { KiroSolution } from '../evaluation/kiro-solution';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Instance)
    private readonly instanceRepository: Repository<Instance>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async create(instance: Instance, team: Team, solutionString: string): Promise<Submission> {
    let submission = new Submission();
    submission.instance = instance;
    submission.team = team;

    const kiroInstance = new KiroInstance(instance.filename);
    const kiroSolution = new KiroSolution(solutionString);

    let lastException: Error;
    try {
      checkSolution(kiroInstance, kiroSolution);
      submission.score = evaluateSolution(kiroInstance, kiroSolution);
    } catch (exception) {
      lastException = new UnprocessableEntityException(exception.message);
      submission.error = exception.message;
    } finally {
      submission = await this.submissionRepository.save(submission);
    }

    if (!lastException) {
      return submission;
    } else {
      throw lastException;
    }
  }
}
