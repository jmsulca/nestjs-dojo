import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/').expect(403);
    expect(response.body).toEqual({
      statusCode: 403,
      message: 'Forbidden resource',
      error: 'Forbidden'
    });
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .set({auth: 'abc123'})
      .expect(200);
    expect(response.body).toEqual({api: 'Hello World!'});
  });
});
