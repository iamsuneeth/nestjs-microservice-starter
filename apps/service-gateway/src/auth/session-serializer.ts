import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    user.token = this.jwtService.sign({ sub: user.userId });
    done(null, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
