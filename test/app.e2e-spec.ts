import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/all (GET)', () => {
    return request(app.getHttpServer())
      .get('/all')
      .expect(200);
  });

  it('/all?sort=true (GET)', () => {
    return request(app.getHttpServer())
      .get('/all?sort=true')
      .expect(200);
  });

  it('/book/:isbn (GET)', () => {
    return request(app.getHttpServer())
      .get('/book/5554-5545-4518')
      .expect(200);
  });

  it('/book/:isbn (GET) no data found', () => {
    return request(app.getHttpServer())
      .get('/book/5554-5545')
      .expect(200)
      .expect("No Data Found");
  });

  it('/allByAuthor (GET)', () => {
    return request(app.getHttpServer())
      .get('/allByAuthor?email=null-walter@echocat.org')
      .expect(200);
  });

  it('/allByAuthor (GET) no data found', () => {
    return request(app.getHttpServer())
      .get('/allByAuthor?email=')
      .expect(200)
      .expect("No Data Found");
  });

  it('/add (POST)', () => {
    return request(app.getHttpServer())
      .post('/add')
      .send([
        {
            "title": "i help you cook The successful universal cookbook with a large baking section",
            "isbn": "5554-5545-4518",
            "authors": "null-walter@echocat.org",
            "description": "If you are looking for a basic cookbook, you are faced with a wealth of alternatives these days. It's difficult to find the right mix of basic work and recipe collection for you. You should be clear about what you want to focus on or what cooking and baking skills you can already assume."
        },
        {
            "title": "Beautiful cooking",
            "isbn": "5454-5587-3210",
            "authors": "null-walter@echocat.org",
            "publishedAt": "21.05.2011"
        }
    ])
      .expect(201);
  });

  it('/add (POST)', () => {
    return request(app.getHttpServer())
      .post('/add')
      .send([])
      .expect(201)
      .expect("Add Data in the Request Body");
  });

});
