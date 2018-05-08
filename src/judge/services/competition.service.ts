import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from '../entities/competition.entity';

@Component()
export class CompetitionService {
  constructor(
    @InjectRepository(Competition)
    private readonly competitionRepository: Repository<Competition>,
  ) {}

  async findAll(): Promise<Competition[]> {
    return await this.competitionRepository.find();
  }
}
