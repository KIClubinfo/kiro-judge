import { Controller, Get, Param } from '@nestjs/common';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.teamService.findOne(id);
  }
}
