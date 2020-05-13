import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GrpcClientProvider } from '@app/grpc';
import { of } from 'rxjs';
import { serviceConstants } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService, authSetup } from '@app/infra';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const getService = (service: string, packageId: string) => {
    switch (packageId) {
      case serviceConstants.user.package:
        const user = {
          id: 'someId',
          firstName: 'firstName',
        };
        return {
          currentUser() {
            return of(user);
          },
          findByEmail() {
            return of(user);
          },
        };
    }
  };

  const emailClient = {
    send() {
      return of({
        sent: true,
      });
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GrpcClientProvider)
      .useValue({
        getService,
      })
      .overrideProvider(serviceConstants.email.name)
      .useValue(emailClient)
      .compile();

    app = moduleFixture.createNestApplication();
    authSetup(app);
    await app.init();
  });

  it('/auth/v1/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/v1/login')
      .send({
        email: 'a@a.com',
      })
      .expect(200)
      .expect({
        sent: true,
      });
  });
  it('/auth/v1/validate (POST)', () => {
    const jwtService = app.get(JwtService);
    const token = jwtService.sign({
      sub: 'someId',
    });
    const clientService = app.get(ClientService);
    this.redisClient = clientService.getClient('data', 'redis');
    this.redisClient.hset('jwt', 'someId', token);
    return request(app.getHttpServer())
      .get(`/auth/v1/validate?token=${token}`)
      .expect(200)
      .expect('true')
      .expect('set-cookie', /session.main(.)*/);
  });
});
