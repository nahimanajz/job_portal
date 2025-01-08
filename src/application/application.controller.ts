import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRoleGuard, BaseAuthGuard } from 'src/auth/guards';
import { ApplicationQueryDto } from './dto/query-application.dto';

@Controller('application')
@ApiTags("Applications")
@ApiBearerAuth()
@UseGuards(BaseAuthGuard)

export class ApplicationController {
  
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiResponse({description: "create new job application"})
  create(@Request() req:any,  @Body() createApplicationDto: CreateApplicationDto) {
     
    try {
     return this.applicationService.create(req.user, createApplicationDto);
    } catch (error) {
     return error 
    }
  }

  @Get()
  findAll(@Query() query?:ApplicationQueryDto) {
    try {
      console.log(query)
      return this.applicationService.findAll(query);
    } catch (error) {
      return error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      
      return this.applicationService.findOne(id);
    } catch (error) {
      return error
    }
  }

  @UseGuards(AdminRoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    try {
      
      return this.applicationService.update(id, updateApplicationDto);
    } catch (error) {
      return error
    }
  }
  
  @UseGuards(AdminRoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      
      return this.applicationService.remove(id);
    } catch (error) {
      return error
    }
  }
}
