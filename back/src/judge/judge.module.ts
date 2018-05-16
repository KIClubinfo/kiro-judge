import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionController } from './controllers/competition.controller';
import { InstanceController } from './controllers/instance.controller';
import { SubmissionController } from './controllers/submission.controller';
import { TeamController } from './controllers/team.controller';
import { Competition } from './entities/competition.entity';
import { Instance } from './entities/instance.entity';
import { Submission } from './entities/submission.entity';
import { Team } from './entities/team.entity';
import { CompetitionService } from './services/competition.service';
import { InstanceService } from './services/instance.service';
import { SubmissionService } from './services/submission.service';
import { TeamService } from './services/team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Competition, Instance, Submission, Team])],
  providers: [CompetitionService, InstanceService, SubmissionService, TeamService],
  controllers: [CompetitionController, InstanceController, SubmissionController, TeamController],
})
export class JudgeModule {}
