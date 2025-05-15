import { LocalModule } from './local/local.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LocalModule],
})
export class AuthModule {}
