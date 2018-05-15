import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { CompetitionService } from '../services/competition.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('competitions')
@UseGuards(AuthGuard('jwt'))
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get()
  async findAll() {
    return this.competitionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    try {
      return await this.competitionService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Get(':id/leaderboard')
  async getLeaderboard(@Param('id') id) {
    try {
      return await this.competitionService.getLeaderboard(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
