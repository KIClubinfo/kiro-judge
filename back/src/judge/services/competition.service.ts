import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from '../entities/competition.entity';
import { ITeamRanking } from '../interfaces/team-ranking.interface';

@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(Competition)
    private readonly competitionRepository: Repository<Competition>,
  ) {}

  async findAll(): Promise<Competition[]> {
    return this.competitionRepository.find();
  }

  async findOne(id): Promise<Competition> {
    return this.competitionRepository.findOneOrFail(id, { relations: ['instances']});
  }

  async getLeaderboard(id): Promise<ITeamRanking[]> {
    return [
      {
        rank: 2,
        name: 'Second Team',
        bestScore: 7,
      },
      {
        rank: 1,
        name: 'Best Team',
        bestScore: 666,
      },
    ];
  }
}
