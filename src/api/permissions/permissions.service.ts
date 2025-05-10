import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './permissions.repository';

@Injectable()
export class PermissionsService {
  constructor(private readonly repo: PermissionsRepository) {}
}
