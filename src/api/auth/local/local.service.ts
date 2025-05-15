import * as bcrypt from 'bcrypt';

import { compareHash, zodErrorParse } from '@/common/utils/lib';
import {
  responseBadRequest,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { HasRoleRepository } from '@/api/has-roles/has-roles.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalSignInDto } from './local.dto';
import { UsersRepository } from '@/api/users/users.repository';
import { localAuthSchema } from './local.schema';

@Injectable()
export class LocalService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwt: JwtService,
    private readonly hasRolesRepo: HasRoleRepository,
  ) {}

  async localSignIn(data: LocalSignInDto) {
    try {
      const parsed = localAuthSchema.parse(data);
      const user = await this.userRepo.findByEmail(parsed.email);
      if (!user) return responseNotFound({ message: 'User not found' });
      const hasRoles = (await this.hasRolesRepo.findByUserId(user.id)).map(
        (value) => ({
          id: value.role.id,
          code: value.role.code,
          name: value.role.name,
        }),
      );
      const isMatch = compareHash(parsed.password, user.password);
      if (!isMatch)
        return responseBadRequest({ message: 'Invalid credentials' });
      const payload = { user_id: user.id };
      const accessToken = this.jwt.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      });
      return responseOk({
        data: {
          user,
          has_roles: hasRoles,
          access_token: accessToken,
        },
      });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        error: error.message || 'Internal Server Error',
      });
    }
  }
}
