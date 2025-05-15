import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { ResourcesModule } from './resources/resources.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { HasRolesModule } from './has-roles/has-roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, RolesModule, ResourcesModule, PermissionsModule, HasRolesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
