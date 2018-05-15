import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async findOne(id): Promise<Team> {
    try {
      return await this.teamRepository.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
