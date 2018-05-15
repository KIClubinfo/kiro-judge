import { Controller, Get, Param } from '@nestjs/common';
import { CompetitionService } from '../services/competition.service';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get()
  async findAll() {
    return this.competitionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.competitionService.findOne(id);
  }

  @Get(':id/leaderboard')
  async getLeaderboard(@Param('id') id) {
    return this.competitionService.getLeaderboard(id);
  }
}
