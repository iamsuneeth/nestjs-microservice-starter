import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { Transport } from '@nestjs/microservices';
import { serviceConstants } from '@app/common';
import { join } from 'path';
import * as ProtoLoader from '@grpc/proto-loader';
import { loadPackageDefinition, credentials, Metadata } from 'grpc';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const pathToProto = '../../../libs/proto/src/proto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: any;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        package: serviceConstants.user.package,
        url: process.env.user_service_url,
        protoPath: join(
          __dirname,
          `${pathToProto}/${serviceConstants.user.package}.proto`,
        ),
      },
    });
    await app.startAllMicroservicesAsync();
    await app.init();
    const proto = ProtoLoader.loadSync(
      join(__dirname, `${pathToProto}/${serviceConstants.user.package}.proto`),
    );
    // Create Raw gRPC client object
    const protoGRPC = loadPackageDefinition(proto) as any;
    // Create client connected to started services at standard 5000 port
    client = new protoGRPC.user.UserService(
      process.env.user_service_url,
      credentials.createInsecure(),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch current user from jwt', done => {
    const jwtService = app.get(JwtService);
    const meta = new Metadata();
    const token = jwtService.sign({
      sub: '8c1966a3-c0b1-4f83-9f55-162c18228135',
    });
    meta.set('authorization', token);
    client.currentUser({}, meta, (err, result) => {
      expect(err).toBe(null);
      done();
    });
  });
});
