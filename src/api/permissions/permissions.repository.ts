import {
  Action,
  PermissionsEntity,
} from '@/database/entity/permissions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsCreateSchema } from './permissions.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class PermissionsRepository {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly repository: Repository<PermissionsEntity>,
  ) {}

  async findById(id: string) {
    return await this.repository.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: {
        role: true,
        resource: true,
      },
    });
  }

  async store(data: PermissionsCreateSchema) {
    return this.repository.save(
      this.repository.create({
        id: generateId(),
        role_id: data.role_id,
        resource_id: data.resource_id,
        action: data.action as Action[],
      }),
    );
  }
}
