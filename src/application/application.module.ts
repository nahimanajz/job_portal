import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entity/application.entity';
import { Job } from 'src/job/entities/job.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Application, Job])
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController]
})
export class ApplicationModule {}
