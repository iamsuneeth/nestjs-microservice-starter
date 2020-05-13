import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectRedis from 'connect-redis';
import { ConfigService } from '@nestjs/config';
import { ClientService } from '../services/client.service';
import { clientConfig, gateWayConfig } from '../constants';

const RedisStore = connectRedis(session);

export function authSetup(app: INestApplication) {
  const client = app
    .get(ClientService)
    .getClient(clientConfig.sessionClient, 'redis');
  const config = app.get(ConfigService);
  const sessionMiddleware = session({
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      secure: config.get(gateWayConfig.protocol) === 'https',
    },
    name: 'session.main',
    store:
      config.get('NODE_ENV') === 'test'
        ? undefined
        : new RedisStore({ client }),
    secret: config.get(gateWayConfig.session.secret),
    unset: 'destroy',
  });

  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
}
