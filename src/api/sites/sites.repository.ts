import { SitesEntity } from '@/database/entity/sites.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { SitesQuerySchema, SitesSchema } from './sites.schema';
import { generateId, zodErrorParse } from '@/common/utils/lib';
import { AddressEntity } from '@/database/entity/address.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class SitesRepository {
  constructor(
    @InjectRepository(SitesEntity)
    private readonly repo: Repository<SitesEntity>,
  ) {}

  async findAll(query: SitesQuerySchema) {
    const { name, page, limit } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<SitesEntity> = {};
    if (name) where.name = ILike(`%${name}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
      relationLoadStrategy: 'join',
      relations: {
        address: {
          province: true,
          regency: true,
          subdistrict: true,
          village: true,
        },
      },
    });
    return { data, total };
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
      relations: {
        address: {
          province: true,
          regency: true,
          subdistrict: true,
          village: true,
        },
      },
    });
  }

  async store(data: SitesSchema) {
    const { name, address } = data;

    const id = generateId();

    return await this.repo.manager.transaction(async (manager) => {
      // Create and save address first (if needed)
      const addressEntity = manager.create(AddressEntity, {
        id: generateId(),
        ref_id: id,
        province_id: address?.provinceId,
        regency_id: address?.regencyId,
        subdistrict_id: address?.subdistrictId,
        village_id: address?.villageId,
        text_address: address?.textAddress,
      });
      const savedAddress = await manager.save(AddressEntity, addressEntity);

      // Create and save site, linking to saved address
      const site = manager.create(SitesEntity, {
        id,
        name,
        address: savedAddress,
      });
      return await manager.save(SitesEntity, site);
    });
  }

  async update(id: string, data: SitesSchema) {
    const { name, address } = data;

    return await this.repo.manager.transaction(async (manager) => {
      // Update site name
      await manager.update(SitesEntity, id, { name });

      // Update address if provided
      if (address) {
        // Find the existing address by ref_id (site id)
        const existingAddress = await manager.findOne(AddressEntity, {
          where: { ref_id: id },
        });
        if (existingAddress) {
          await manager.update(AddressEntity, existingAddress.id, {
            province_id: address.provinceId,
            regency_id: address.regencyId,
            subdistrict_id: address.subdistrictId,
            village_id: address.villageId,
            text_address: address.textAddress,
          });
        }
      }

      // Return the updated site with relations
      return await manager.findOne(SitesEntity, {
        where: { id },
        relations: {
          address: {
            province: true,
            regency: true,
            subdistrict: true,
            village: true,
          },
        },
      });
    });
  }

  async destroy(id: string) {
    return await this.repo.softDelete(id);
  }
}
