import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [UsersModule, RolesModule, ResourcesModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
