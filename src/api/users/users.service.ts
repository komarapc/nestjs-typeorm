import {
  ResponseApi,
  responseBadRequest,
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import {
  UserUpdateDto,
  UserUpdatePasswordDto,
  UsersCreateDto,
  UsersQueryDto,
} from './users.dto';
import { createHash, metaPagination, zodErrorParse } from '@/common/utils/lib';
import {
  userCreateSchema,
  userQuerySchema,
  userUpdatePasswordSchema,
  userUpdateSchema,
} from './users.schema';

import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/database/entity/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  private transformUser(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      create_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async index(query: UsersQueryDto): Promise<ResponseApi> {
    try {
      const parsed = userQuerySchema.parse(query);
      const { data, total } = await this.userRepo.findAll(parsed);
      const meta = metaPagination({
        limit: parsed.limit,
        page: parsed.page,
        total,
      });
      return responseOk({
        data: { users: data.map(this.transformUser), meta },
      });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError();
    }
  }

  async findOne(id: string): Promise<ResponseApi> {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) return responseNotFound({ message: 'User not found' });
      return responseOk({ data: this.transformUser(user) });
    } catch (error) {
      return responseInternalServerError();
    }
  }

  async store(body: UsersCreateDto): Promise<ResponseApi> {
    try {
      const parsed = userCreateSchema.parse(body);
      const existingUser = await this.userRepo.findByEmail(parsed.email);
      if (existingUser) {
        return responseConflict({ message: 'Email already taken' });
      }
      const hashedPassword = createHash(parsed.password);
      const user = await this.userRepo.store({
        ...parsed,
        password: hashedPassword,
      });
      return responseCreated({ data: this.transformUser(user) });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError();
    }
  }

  async update(id: string, data: UserUpdateDto) {
    try {
      const parsed = userUpdateSchema.parse(data);
      const [user, existingEmail] = await Promise.all([
        this.userRepo.findById(id),
        this.userRepo.findByEmail(parsed.email || ''),
      ]);
      if (!user) return responseNotFound({ message: 'User not found' });
      if (existingEmail && existingEmail.id !== id) {
        return responseConflict({ message: 'Email already taken' });
      }
      const updatedUser = await this.userRepo.update(id, parsed);
      return responseOk({
        data: this.transformUser(updatedUser as UserEntity),
      });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError();
    }
  }

  async updatePassword(id: string, data: UserUpdatePasswordDto) {
    try {
      const parsed = userUpdatePasswordSchema.parse(data);
      const user = await this.userRepo.findById(id);
      if (!user) return responseNotFound({ message: 'User not found' });
      const hashedPassword = createHash(parsed.password);
      await this.userRepo.updatePassword(id, hashedPassword);
      return responseOk({ message: 'Password updated successfully' });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError();
    }
  }

  async destroy(id: string) {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) return responseNotFound({ message: 'User not found' });
      await this.userRepo.destroy(id);
      return responseOk({ message: 'User deleted successfully' });
    } catch (error) {
      return responseInternalServerError({
        message: error?.message || 'Internal server error',
      });
    }
  }
}
