import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { ResourcesModule } from './resources/resources.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, RolesModule, ResourcesModule, PermissionsModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
