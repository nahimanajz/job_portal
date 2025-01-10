import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { JobQueryDto } from './dto/job-query.dto';
import { BaseAuthGuard } from 'src/auth/guards';

@Controller('jobs')
@ApiTags("Jobs")
export class JobController {
    constructor(private readonly jobService: JobService ){}

   @HttpCode(HttpStatus.OK)
   @Get()
   @ApiResponse({description:"this endpoint fetch all available jobs", status: 200})
   findAll(@Query() query?:JobQueryDto){
    try {
        return this.jobService.findAll(query)
    } catch (error) {
        return error
    }
   }

   @HttpCode(HttpStatus.OK)
   @Get("/categories")
   @UseGuards(BaseAuthGuard)
   @ApiBearerAuth()
   
   @ApiResponse({description:"this endpoint fetch all categories", status: 200})
   findAllCategories(){
    try {
        return this.jobService.findAllCategories()
    } catch (error) {
        return error
    }
   }
}
