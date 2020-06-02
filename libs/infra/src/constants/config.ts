export const gateWayConfig = {
  port: 'gateway_port',
  session: {
    secret: 'gateway_session_secret',
  },
  protocol: 'gateway_protocol',
  validationUrl: 'login_validation_url',
};

export const externalConfig = {
  redis: {
    url: 'redis_url',
  },
  rmq: {
    url: 'rmq_url',
    queueName: 'rmq_queueName',
  },
};

export const authConfig = {
  jwt: {
    algorithm: 'jwt_signing_algorithm',
    audience: 'jwt_signing_audience',
    issuer: 'jwt_signing_issuer',
    secret: 'jwt_signing_secret',
    public: 'jwt_signing_public',
    private: 'jwt_signing_private',
  },
  auth0: {
    audience: 'auth0_audience',
    clientId: 'auth0_clientId',
    clientSecret: 'auth0_clientSecret',
    callbackUrl: 'auth0_callbackUrl',
    domain: 'auth0_domain',
    jwksUrl: 'auth0_jwks_url',
  },
};
export const serviceConfig = {
  user: {
    url: 'user_service_url',
  },
};
