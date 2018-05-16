import { Controller, Get, NotFoundException, Param, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Competition } from '../entities/competition.entity';
import { Loader } from '../evaluation/loader';
import { CompetitionService } from '../services/competition.service';

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

  @Get(':id/download')
  async downloadSubject(@Param('id') id, @Response() response) {
    let competition: Competition;
    try {
      competition = await this.competitionService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);
    }

    response.download(Loader.getSubjectPath(`subject_${competition.id}.pdf`));
  }
}
