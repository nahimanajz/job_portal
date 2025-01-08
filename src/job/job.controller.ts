import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';

@Controller('job')
@ApiTags("Jobs")
export class JobController {
    constructor(private readonly jobService: JobService ){}

   @HttpCode(HttpStatus.OK)
   @Get()
   @ApiResponse({description:"this endpoint fetch all available jobs", status: 200})
   findAll(){
    try {
        return this.jobService.findAll()
    } catch (error) {
        return error
    }
   }
}
