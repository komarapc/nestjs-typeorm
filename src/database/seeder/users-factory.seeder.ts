import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

import { Action, PermissionsEntity } from '../entity/permissions.entity';

import { DataSource } from 'typeorm';
import { HasRolesEntity } from '../entity/has-roles.entity';
import { Logger } from '@nestjs/common';
import { ResourceEntity } from '../entity/resources.entity';
import { RolesEntity } from '../entity/roles.entity';
import { UserEntity } from '../entity/user.entity';
import { v7 as uuid } from 'uuid';

dotenv.config();
export const seedUsersFactory = async (db: DataSource) => {
  const logger = new Logger('SeedUserFactory');
  await db.transaction(async (manager) => {
    const userRepo = manager.getRepository(UserEntity);
    const rolesRepo = manager.getRepository(RolesEntity);
    const permissionsRepo = manager.getRepository(PermissionsEntity);
    const hasRoleRepo = manager.getRepository(HasRolesEntity);
    const resourceRepo = manager.getRepository(ResourceEntity);

    // users
    const users: UserEntity[] = [
      {
        id: uuid(),
        name: 'Admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync(
          process.env.SEEDER_PASSWORD_ADMIN || 'password123',
          parseInt(process.env.SALT_ROUNDS as string) || 12,
        ),
      },
      {
        id: uuid(),
        name: 'Guest',
        email: 'guest@mail.com',
        password: bcrypt.hashSync(
          process.env.SEEDER_PASSWORD_USER || 'password123',
          parseInt(process.env.SALT_ROUNDS as string) || 12,
        ),
      },
    ];
    // roles
    const roles: RolesEntity[] = [
      {
        id: uuid(),
        code: 'admin',
        name: 'Admin',
      },
      {
        id: uuid(),
        code: 'guest',
        name: 'Guest',
      },
    ];
    // permissions
    const resources: ResourceEntity[] = [
      {
        id: uuid(),
        name: 'All',
        path: '*',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const hasRoles: HasRolesEntity[] = [
      {
        id: uuid(),
        user_id: users[0].id,
        role_id: roles[0].id,
      },
    ];

    const permissions: PermissionsEntity[] = [
      {
        id: uuid(),
        action: ['ALL'] as Action[],
        resource_id: resources[0].id,
        role_id: roles[0].id,
      },
    ];

    try {
      await userRepo.save(users);
      logger.log('Users seeded');
      await rolesRepo.save(roles);
      logger.log('Roles seeded');
      await resourceRepo.save(resources);
      logger.log('Resources seeded');
      await hasRoleRepo.save(hasRoles);
      logger.log('HasRoles seeded');
      await permissionsRepo.save(permissions);
      logger.log('Permissions seeded');
    } catch (error) {
      logger.error('Error seeding data', error);
      throw error;
    }
  });
};
