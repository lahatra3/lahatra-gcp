import { Module } from '@nestjs/common';
import { MembresModule } from './membres/membres.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MembresModule, AuthModule]
})
export class AppModule {}
