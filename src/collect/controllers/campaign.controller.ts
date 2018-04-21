import { Controller, Get } from '@nestjs/common';
import { CampaignService } from '../services/campaign.service';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  async findAll() {
    return this.campaignService.findAll();
  }
}
