import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { CompetitionService } from './services/competition.service';
import { Instance } from './entities/instance.entity';
import { Submission } from './entities/submission.entity';
import { CompetitionController } from './controllers/competition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Competition, Instance, Submission])],
  components: [CompetitionService],
  controllers: [CompetitionController],
})
export class JudgeModule {}
