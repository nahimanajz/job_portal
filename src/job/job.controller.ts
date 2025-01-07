import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService){}
    
    @Post()
    @ApiOperation({summary: "create new job"})
    @ApiResponse({status: 201, description:"Job created succesfully"})
    @ApiResponse({status: 400, description:"Validatin error"})

    create(@Body() createJob: CreateJobDto){
        return this.jobService.create(createJob)
    }
    
    @Get()
    @ApiOperation({ summary: 'Get all job listings' })
    @ApiResponse({ status: 200, description: 'List of jobs' })
    findAll() {
      return this.jobService.findAll();
    }


}
