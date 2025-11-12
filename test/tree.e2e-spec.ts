import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Tree API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let server: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.enableCors();

    prisma = app.get(PrismaService);
    await prisma.node.deleteMany();

    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.node.deleteMany();
  });

  it('returns an empty array when no nodes exist', async () => {
    await request(server).get('/api/tree').expect(200).expect([]);
  });

  it('creates nodes and returns a nested tree', async () => {
    const rootResponse = await request(server)
      .post('/api/tree')
      .send({ label: 'Root' })
      .expect(201);

    const childResponse = await request(server)
      .post('/api/tree')
      .send({ label: 'Child', parentId: rootResponse.body.id })
      .expect(201);

    const { body } = await request(server).get('/api/tree').expect(200);

    expect(body).toEqual([
      {
        id: rootResponse.body.id,
        label: 'Root',
        parentId: null,
        children: [
          {
            id: childResponse.body.id,
            label: 'Child',
            parentId: rootResponse.body.id,
            children: [],
          },
        ],
      },
    ]);
  });
});
