import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import request from 'supertest';
import {AppModule} from 'back/src/app.module';

// TOO
describe('CampaignController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET /campaigns', () => {
        return request(app.getHttpServer())
            .get('/campaigns')
            .expect(200)
            .expect([
                {},
            ]);
    });
});
