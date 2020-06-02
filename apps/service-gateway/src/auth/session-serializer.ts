import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ISubject } from '@app/common/interfaces/subject';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  serializeUser(user: ISubject, done: (err: Error, user: any) => void): any {
    user.token = this.jwtService.sign({ sub: user.info.id });
    done(null, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
