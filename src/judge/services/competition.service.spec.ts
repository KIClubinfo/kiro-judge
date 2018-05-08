import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Competition } from '../entities/competition.entity';
import { CompetitionService } from './competition.service';

describe('CompetitionService', () => {
  let app: TestingModule;

  const RepositoryMock = jest.fn<Repository<Competition>>(() => ({
    find: jest.fn(() => [
      {
        id: 1,
        name: 'Super competition',
        desc: '',
      },
    ]),
  }));
  const mockedRepository = new RepositoryMock();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      components: [
        CompetitionService,
        { provide: 'CampaignRepository', useValue: mockedRepository },
      ],
    }).compile();
  });

  describe('findAll', () => {
    it('should return repository\'s find result', async () => {
      const campaignService = app.get<CompetitionService>(CompetitionService);
      expect(await campaignService.findAll()).toEqual(mockedRepository.find());
      expect(mockedRepository.find).toHaveBeenCalled();
    });
  });
});
