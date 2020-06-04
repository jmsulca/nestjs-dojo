import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodosModule } from '../src/todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import MockMongo, {setupServer} from './mongo.mock';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const uri = await setupServer();
    await new MockMongo().setup(uri);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), TodosModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it.skip('/todos (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos?page=0&size=2')
      .expect(200);
    expect(response.body).toEqual({
      data: [
        {
          _id: '5ed4285ef34a5a63913189a1',
          name: 'Create project',
          done: true
        },
        {
          _id: '5ed42878f34a5a63913189ad',
          name: 'Create the first controller',
          done: true
        }
      ],
      page: 0,
      size: 2
    });
  });

  it.skip('/todos/pending (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos/pending')
      .expect(200);
    expect(response.body).toEqual([
      {
        _id: '5ed4288cf34a5a63913189b0',
        name: 'Add swagger',
        done: false
      }
    ]);
  });

  it.skip('/todos/done (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos/done')
      .expect(200);
    expect(response.body).toEqual([
      {
        _id: '5ed4285ef34a5a63913189a1',
        name: 'Create project',
        done: true
      },
      {
        _id: '5ed42878f34a5a63913189ad',
        name: 'Create the first controller',
        done: true
      }
    ]);
  });

  it.skip('/todos/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos/5ed4285ef34a5a63913189a1')
      .expect(200);
    expect(response.body).toEqual({
      _id: '5ed4285ef34a5a63913189a1',
      name: 'Create project',
      done: true
    });
  });

  it.skip('/todos (POST)', async () => {
    const newTodo = {name: 'Some task', done: true}
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send(newTodo)
      .expect(200);
    expect(response.body).toEqual({
      _id: expect.any(String),
      name: 'Some task',
      done: true
    });
  });

  it.skip('/todos/5ed4285ef34a5a63913189a1 (PUT)', async () => {
    const updatedTodo = {name: 'First task', done: false}
    const response = await request(app.getHttpServer())
      .put('/todos/5ed4285ef34a5a63913189a1')
      .send(updatedTodo)
      .expect(200);
    expect(response.body).toEqual({
      _id: '5ed4285ef34a5a63913189a1',
      name: 'First task',
      done: false
    });
  });

  it.skip('/todos/5ed4285ef34a5a63913189a1 (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/todos/5ed4288cf34a5a63913189b0')
      .expect(200);
    expect(response.body).toEqual({
      count: 1
    });
  });
});
