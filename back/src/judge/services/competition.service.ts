import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from '../entities/competition.entity';
import { Submission } from '../entities/submission.entity';
import { Team } from '../entities/team.entity';
import { ITeamRanking } from '../interfaces/team-ranking.interface';


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

  async findOne(id: number): Promise<Competition> {
    return this.competitionRepository.findOneOrFail(id, { relations: ['instances']});
  }

  async getLeaderboard(id: number): Promise<ITeamRanking[]> {
    const competition = await this.competitionRepository.findOneOrFail(id);
    const now = new Date();
    const isFrozen = competition.freezeDate <= now && now < competition.endDate;

    const teamRankings = await this.teamRepository
      .createQueryBuilder('team')
      .select('team.name', 'name')
      .addSelect('SUM(score)', 'bestScore')
      .innerJoin((qb) => {
        const subquery = qb
          .subQuery()
          .from(Submission, 'submission')
          .select('submission.team.id', 'subTeamId')
          .addSelect('submission.instance.id', 'instanceId')
          .addSelect('MIN(score)', 'score')
          .groupBy('instanceId');

        if (isFrozen) {
          return subquery.where('submission.createdAt < :freezeDate', {
            freezeDate: competition.freezeDate,
          });
        }

        return subquery;
      }, 'teamsScores', 'team.id = subTeamId')
      .where('team.competitionId = :id', { id })
      .groupBy('team.id')
      .orderBy('bestScore', 'ASC')
      .getRawMany();

    return teamRankings.map((team: any, index) => ({
      rank: index + 1,
      ...team,
    }));
  }
}
