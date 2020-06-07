/* eslint-disable */
import { Empty } from './google/protobuf/empty';
import { Observable } from 'rxjs';

export interface UserByIdRequest {
  Id: string;
}

export interface UserByEmailRequest {
  email: string;
}

export interface UserSearchRequest {
  email: string;
  firstName: string;
  lastName: string;
  partyId: number;
}

export interface UserSearchResponse {
  sent: boolean;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  partyId: number;
  phone: number;
}

export interface UserService {
  searchUser(request: UserSearchRequest): Observable<UserSearchResponse>;

  currentUser(request: Empty): Observable<UserResponse>;

  findById(request: UserByIdRequest): Observable<UserResponse>;

  findByEmail(request: UserByEmailRequest): Observable<UserResponse>;
}
