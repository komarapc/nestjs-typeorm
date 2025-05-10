import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { ResourcesModule } from './resources/resources.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { HasRolesModule } from './has-roles/has-roles.module';

@Module({
  imports: [UsersModule, RolesModule, ResourcesModule, PermissionsModule, HasRolesModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
