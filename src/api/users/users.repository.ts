import { Injectable } from '@nestjs/common';
import {
  UserCreateSchema,
  UserQuerySchema,
  UserUpdateSchema,
} from './users.schema';
import { generateId } from '@/common/utils/lib';
import { UserEntity } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async findAll(
    query: UserQuerySchema,
  ): Promise<{ data: UserEntity[]; total: number }> {
    try {
      const { name, email, page, limit } = query;
      const skip = (page - 1) * limit;
      const take = limit;
      const where: FindOptionsWhere<UserEntity> = {
        name: name ? ILike(`%${name}%`) : undefined,
        email: email ? ILike(`%${email}%`) : undefined,
      };
      const [data, total] = await this.repo.findAndCount({ where, skip, take });
      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async store(data: UserCreateSchema) {
    try {
      const id = generateId();
      const userData: UserEntity = {
        id,
        name: data.name,
        email: data.email,
        password: data.password,
        created_at: new Date(),
      };
      const newUser = this.repo.create(userData);
      await this.repo.save(newUser);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.repo.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.repo.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UserUpdateSchema) {
    try {
      await this.repo.update(id, {
        name: data.name,
        email: data.email,
        updated_at: new Date(),
      });
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(id: string, password: string) {
    try {
      await this.repo.update(id, { password, updated_at: new Date() });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: string) {
    try {
      await this.repo.update(id, { deleted_at: new Date() });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
