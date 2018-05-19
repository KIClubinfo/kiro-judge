import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { loadFixtures } from '../src/scripts/fixtures-loader';

describe('CampaignController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await loadFixtures('campaigns');
  });

  it('/GET /campaigns', () => {
    return request(app.getHttpServer())
      .get('/campaigns')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'first_campaign',
          description: '',
          isSuspended: false,
          isReleased: true,
        },
        {
          id: 2,
          name: 'second_campaign',
          description: '',
          isSuspended: false,
          isReleased: false,
        },
      ]);
  });
});
