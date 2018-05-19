import { Body, Controller, ForbiddenException, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubmissionCreationDto } from '../dto/submission-creation.dto';
import { Instance } from '../entities/instance.entity';
import { InstanceService } from '../services/instance.service';
import { SubmissionService } from '../services/submission.service';

@Controller('submissions')
@UseGuards(AuthGuard('jwt'))
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly instanceService: InstanceService,
  ) {}

  @Post()
  async create(
    @Body() dto: SubmissionCreationDto,
    @Req() request,
  ) {
    const userTeam = request.user.teams.find((team) => team.id === dto.teamId);
    if (!userTeam) {
      throw new ForbiddenException('Not part of this team');
    }

    let instance: Instance;
    try {
      instance = await this.instanceService.findOne(dto.instanceId);
    } catch (e) {
      throw new NotFoundException(e);
    }

    if (new Date() < instance.competition.startDate) {
      throw new ForbiddenException('Competition has not started');
    }

    if (instance.competition.endDate <= new Date()) {
      throw new ForbiddenException('Competition has ended');
    }

    return this.submissionService.create(instance, userTeam, dto.solution);
  }
}
