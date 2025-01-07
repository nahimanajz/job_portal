import { Controller, Post, Body, UseGuards, Get, Request, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from 'src/auth/guard/local-auth.guard';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entity/application.entity';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async applyForJob(@Request() req, @Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.applyForJob(req.user, createApplicationDto);
  }

  @Get()
  async getUserApplications(@Request() req) {
    return this.applicationService.findApplicationsByUser(req.user);
  }
  @Get("all")
  async findAll() {
    return this.applicationService.findAll();
  }

   @Patch(':id')
    update(@Param('id') id: string, @Body() data:UpdateApplicationDto ): Promise<Application> {
      return this.applicationService.update(+id, data);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
      return this.applicationService.delete(+id);
    }
}
