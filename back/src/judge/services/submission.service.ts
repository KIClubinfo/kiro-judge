import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instance } from '../entities/instance.entity';
import { Submission } from '../entities/submission.entity';
import { checkSolution, evaluateSolution } from '../evaluation/evaluation';
import { KiroInstance } from '../evaluation/kiro-instance';
import { KiroSolution } from '../evaluation/kiro-solution';
import { Team } from '../entities/team.entity';

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

  async create(instanceId: number, teamId: number, solutionString: string): Promise<Submission> {
    const instance = await this.instanceRepository.findOneOrFail(instanceId);

    let submission = new Submission();
    submission.instance = instance;
    submission.team = await this.teamRepository.findOneOrFail(teamId);

    const kiroInstance = new KiroInstance(instance.id);
    const kiroSolution = new KiroSolution(solutionString);

    let lastException: Error;
    let score: number;
    try {
      checkSolution(kiroInstance, kiroSolution);
      score = evaluateSolution(kiroInstance, kiroSolution);
    } catch (exception) {
      lastException = new UnprocessableEntityException(exception.message);
      score = -1;
    } finally {
      submission.score = score;
      submission = await this.submissionRepository.create(submission);
    }

    if (!lastException) {
      return submission;
    } else {
      throw lastException;
    }
  }
}
