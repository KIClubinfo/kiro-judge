import {Test, TestingModule} from '@nestjs/testing';
import {CampaignService} from './campaign.service';

describe('CampaignService', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [CampaignService],
        }).compile();
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            const campaignService = app.get<CampaignService>(CampaignService);
            expect(campaignService.findAll()).toBe('Hello World!');
        });
    });
});
