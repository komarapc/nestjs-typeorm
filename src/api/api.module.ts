import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AddressModule } from './address/address.module';
import { AdmininstrativeAreaModule } from './admininstrative-area/admininstrative-area.module';
import { AuthModule } from './auth/auth.module';
import { HasRolesModule } from './has-roles/has-roles.module';
import { JwtMiddleware } from '@/common/middleware/jwt/jwt.middleware';
import { JwtService } from '@nestjs/jwt';
import { LocationsModule } from './locations/locations.module';
import { LoggerMiddleware } from '@/common/middleware/logger/logger.middleware';
import { PermissionsModule } from './permissions/permissions.module';
import { ResourcesModule } from './resources/resources.module';
import { RolesModule } from './roles/roles.module';
import { SitesModule } from './sites/sites.module';
import { UnitConversionsModule } from './unit-conversions/unit-conversions.module';
import { UnitItemsModule } from './unit-items/unit-items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ResourcesModule,
    PermissionsModule,
    HasRolesModule,
    AuthModule,
    SitesModule,
    LocationsModule,
    AdmininstrativeAreaModule,
    AddressModule,
    UnitItemsModule,
    UnitConversionsModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '', method: RequestMethod.GET },
        { path: '/auth/local/sign-in', method: RequestMethod.POST },
      )
      .forRoutes('*path');
  }
}
