import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { JwtService } from '@nestjs/jwt';
import { ApplicationModule } from 'src/application/application.module';
import { ApplicationService } from 'src/application/application.service';
import { JobService } from 'src/job/job.service';

@Module({
  imports: [ApplicationModule],
  controllers: [DashboardController],
  providers: [DashboardService, JwtService,ApplicationService, JobService]
})
export class DashboardModule {}
