import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobQueryDto } from './dto/job-query.dto';
import { paginateJobs } from 'src/common/utils/pagination.util';

@Injectable()
export class JobService {
  getByCategoryOrLocation(query: any) {
    throw new Error('Method not implemented.');
  }

    constructor(private prisma: PrismaService){}
    
    
   async findAll(query?: JobQueryDto ) {

        const {where, orderBy, skip, pageSize, currentPage} = paginateJobs(query) 
        const jobs = await this.prisma.job.findMany({
            where,
            orderBy,
            skip,
            take: pageSize,
        });

         // Total count for pagination metadata
        const totalCount = await this.prisma.job.count({ where });

    return {
      jobs,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage,
      totalCount,
    };
    }
}
