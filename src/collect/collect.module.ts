import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignController } from './controllers/campaign.controller';
import { Campaign } from './entities/campaign.entity';
import { CampaignService } from './services/campaign.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  components: [CampaignService],
  controllers: [CampaignController],
})
export class CollectModule {}
