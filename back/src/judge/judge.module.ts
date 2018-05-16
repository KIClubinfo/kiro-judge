import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionController } from './controllers/competition.controller';
import { Competition } from './entities/competition.entity';
import { Instance } from './entities/instance.entity';
import { Submission } from './entities/submission.entity';
import { Team } from './entities/team.entity';
import { CompetitionService } from './services/competition.service';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';
import { SubmissionService } from './services/submission.service';
import { SubmissionController } from './controllers/submission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Competition, Instance, Submission, Team])],
  providers: [CompetitionService, SubmissionService, TeamService],
  controllers: [CompetitionController, SubmissionController, TeamController],
})
export class JudgeModule {}
