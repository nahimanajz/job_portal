import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, JwtService],
})
export class ApplicationModule {}
