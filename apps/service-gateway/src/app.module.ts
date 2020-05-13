import { Module } from '@nestjs/common';
import { RootModule } from '@app/infra';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CommonModule } from '@app/common';
import { GrpcModule } from '@app/grpc';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    RootModule,
    CommonModule,
    GrpcModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, 'schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    ProfileModule,
  ],
  providers: [],
})
export class AppModule {}
