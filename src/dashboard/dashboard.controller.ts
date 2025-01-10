import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { ApplicationService } from 'src/application/application.service';

import { JobService } from 'src/job/job.service';
import {BaseAuthGuard } from 'src/auth/guards';

@Controller('dashboard')
@ApiTags("Dashboard")

@ApiBearerAuth()
@UseGuards(BaseAuthGuard)

export class DashboardController {

      constructor(
        private readonly dashboardService: DashboardService, 
        private readonly jobService: JobService,
        private readonly applicationService: ApplicationService
      ) {}
       
      @Get("/applications/over-time")
        filterApplications(@Query('interval') interval: 'day' | 'month' | 'year') {
          try {
      
            return this.applicationService.getApplicationsOverTime(interval)
          } catch (error) {
            return error
          }
        }
        @Get("/jobs")
        findAll(@Query() query?:any) {
          try {
            
            return this.jobService.getByCategoryOrLocation(query);
          } catch (error) {
            return error
          }
        }
    
}
