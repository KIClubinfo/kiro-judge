import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('teams')
@UseGuards(AuthGuard('jwt'))
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    try {
      return await this.teamService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
