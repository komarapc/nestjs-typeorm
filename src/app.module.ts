import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ConfigModule.forRoot(), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
