import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubmissionService } from '../services/submission.service';
import { SubmissionCreationDto } from '../dto/submission-creation.dto';

@Controller('submissions')
@UseGuards(AuthGuard('jwt'))
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  async create(
    @Body() dto: SubmissionCreationDto,
    @Req() request,
  ) {
    // if (!request.user.teams.find((team) => team.id === teamId)) {
    //   throw new ForbiddenException();
    // }

    return this.submissionService.create(dto.instanceId, dto.teamId, dto.solution);
  }
}
