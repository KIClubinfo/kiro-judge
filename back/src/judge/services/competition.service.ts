import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from '../entities/competition.entity';
import { Team } from '../entities/team.entity';
import { ITeamRanking } from '../interfaces/team-ranking.interface';
import { Submission } from '../entities/submission.entity';

@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(Competition)
    private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async findAll(): Promise<Competition[]> {
    return this.competitionRepository.find();
  }

  async findOne(id): Promise<Competition> {
    return this.competitionRepository.findOneOrFail(id, { relations: ['instances']});
  }

  async getLeaderboard(id): Promise<ITeamRanking[]> {
    const teamRankings = await this.teamRepository
      .createQueryBuilder('team')
      .select('team.name', 'name')
      .addSelect('COALESCE(SUM(score), 0)', 'bestScore')
      .leftJoin((qb) => {
        return qb
          .subQuery()
          .from(Submission, 'submission')
          .select('submission.team.id', 'subTeamId')
          .addSelect('submission.instance.id', 'instanceId')
          .addSelect('MAX(score)', 'score')
          .groupBy('instanceId');
      }, 'teamsScores', 'team.id = subTeamId')
      .where('team.competitionId = :id', { id })
      .groupBy('team.id')
      .orderBy('bestScore', 'DESC')
      .getRawMany();

    return teamRankings.map((team: {name, bestScore}, index) => ({
      rank: index + 1,
      ...team,
    }));
  }
}
