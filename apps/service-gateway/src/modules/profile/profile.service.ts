import { Injectable } from '@nestjs/common';
import { GrpcClientProvider } from '@app/grpc';
import { serviceConstants } from '@app/common';
import { UserService } from '@app/proto';

@Injectable()
export class ProfileService {
  private userProtoService: UserService;
  constructor(grpcClientProvider: GrpcClientProvider) {
    this.userProtoService = grpcClientProvider.getService<UserService>(
      serviceConstants.user.service,
      serviceConstants.user.package,
    );
  }

  fetchProfile() {
    return this.userProtoService.currentUser({}).toPromise();
  }
}
