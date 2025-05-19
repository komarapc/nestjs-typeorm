import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type Payload = {
  user_id: string;
  role_id: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtAuthService {
  private token: string;
  constructor(private readonly jwt: JwtService) {}
  setToken(token: string) {
    this.token = token;
  }

  getPayload(): Payload {
    const payload: Payload = this.jwt.decode(this.token);
    return payload;
  }
}
