import { Module } from '@nestjs/common';
import { MembresController } from './membres.controller';
import { MembresService } from './membres.service';

@Module({
  controllers: [MembresController],
  providers: [MembresService],
})
export class MembresModule {}
