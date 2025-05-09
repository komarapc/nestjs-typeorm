import { Injectable } from '@nestjs/common';
import { ResourceRepository } from './resources.repository';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourceRepo: ResourceRepository) {}
}
