import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Campaign } from '../entities/campaign.entity';
import { CampaignService } from './campaign.service';

describe('CampaignService', () => {
  let app: TestingModule;

  const RepositoryMock = jest.fn<Repository<Campaign>>(() => ({
    find: jest.fn(() => [
      {
        id: 1,
        name: 'first_campaign',
        desc: '',
        isSuspended: false,
        isReleased: true,
      },
    ]),
  }));
  const mockedRepository = new RepositoryMock();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      components: [
        CampaignService,
        { provide: 'CampaignRepository', useValue: mockedRepository },
      ],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const campaignService = app.get<CampaignService>(CampaignService);
      expect(await campaignService.findAll()).toEqual(mockedRepository.find());
      expect(mockedRepository.find).toHaveBeenCalled();
    });
  });
});
