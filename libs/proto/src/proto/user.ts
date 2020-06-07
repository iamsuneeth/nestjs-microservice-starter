/* eslint-disable */
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

export interface UserByIdRequest {
  id: string;
}

export interface UserByEmailRequest {
  email: string;
}

export interface UserSearchRequest {
  query: string;
}

export interface UserSearchResponse {
  users: UserResponse[];
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UserServiceController {
  searchUser(
    request: UserSearchRequest,
  ):
    | Promise<UserSearchResponse>
    | Observable<UserSearchResponse>
    | UserSearchResponse;

  currentUser(
    request: Empty,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  findById(
    request: UserByIdRequest,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  findByEmail(
    request: UserByEmailRequest,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
}

export interface UserServiceClient {
  searchUser(request: UserSearchRequest): Observable<UserSearchResponse>;

  currentUser(request: Empty): Observable<UserResponse>;

  findById(request: UserByIdRequest): Observable<UserResponse>;

  findByEmail(request: UserByEmailRequest): Observable<UserResponse>;
}

export function UserServiceControllerMethods() {
  return function(constructor: Function) {
    const grpcMethods: string[] = [
      'searchUser',
      'currentUser',
      'findById',
      'findByEmail',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_PACKAGE_NAME = 'user';
export const USER_SERVICE_NAME = 'UserService';
