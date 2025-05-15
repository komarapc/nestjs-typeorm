import { HasRoleRepository } from '@/api/has-roles/has-roles.repository';
import { HasRolesEntity } from '@/database/entity/has-roles.entity';
import { JwtService } from '@nestjs/jwt';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/database/entity/user.entity';
import { UsersRepository } from '@/api/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, HasRolesEntity])],
  controllers: [LocalController],
  providers: [LocalService, JwtService, UsersRepository, HasRoleRepository],
})
export class LocalModule {}
