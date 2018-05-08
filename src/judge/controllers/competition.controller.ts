import { Controller, Get } from '@nestjs/common';
import { CompetitionService } from '../services/competition.service';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get()
  async findAll() {
    return this.competitionService.findAll();
  }
}
