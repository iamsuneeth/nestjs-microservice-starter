import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { ConfigService } from '@nestjs/config';
import { authConfig } from '@app/infra';

@Injectable()
export class ManagementClientProviduer {
  private manaementClient: ManagementClient;
  constructor(configService: ConfigService) {
    this.manaementClient = new ManagementClient({
      domain: configService.get(authConfig.auth0.domain),
      clientId: configService.get(authConfig.auth0.clientId),
      clientSecret: configService.get(authConfig.auth0.clientSecret),
    });
  }

  getClient() {
    return this.manaementClient;
  }
}
