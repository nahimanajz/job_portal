import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { ApplicationService } from 'src/application/application.service';
import { ApplicationQueryDto } from 'src/application/dto/query-application.dto';
import { AdminRoleGuard } from 'src/auth/guards';

@Controller('dashboard')
@ApiTags("Dashboard")

@ApiBearerAuth()
@UseGuards(AdminRoleGuard)

export class DashboardController {

      constructor(private readonly dashboardService: DashboardService, private readonly applicationService: ApplicationService) {}
       @Get()
        findAll(@Query() query?:ApplicationQueryDto) {
          try {
            
            return this.applicationService.findAll(query);
          } catch (error) {
            return error
          }
        }
    
}
