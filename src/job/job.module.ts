import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JobService, JwtService],
  controllers: [JobController],
})
export class JobModule {}
