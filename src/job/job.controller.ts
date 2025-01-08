import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { JobQueryDto } from './dto/job-query.dto';

@Controller('job')
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
}
