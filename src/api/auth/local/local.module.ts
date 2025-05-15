import { HasRolesEntity } from '@/database/entity/has-roles.entity';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/database/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, HasRolesEntity])],
  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule {}
