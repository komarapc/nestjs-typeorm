import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsRepository {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly repository: Repository<PermissionsEntity>,
  ) {}
}
