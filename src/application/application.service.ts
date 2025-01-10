import { ConflictException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginateApplication } from 'src/common/utils/pagination.util';
import { IQuery } from 'src/common/interfaces/query.interface';
import { ApplicationQueryDto } from './dto/query-application.dto';

@Injectable()
export class ApplicationService {
  
  constructor(private prisma: PrismaService) {}

  async create(user: any, dto: CreateApplicationDto) {
    const existingRecord = await this.prisma.application.findFirst({
      where: {
        jobId: dto.jobId,
        userId: user.id,
      }
    });
    if (existingRecord) {
      throw new ConflictException('You have already applied to this position.');
    }
    const job = await this.prisma.job.findFirst({where: {id: dto.jobId}})

    return await this.prisma.application.create({
      data: {
        userId: user.id,
        jobId: dto.jobId,
        status: dto.status,
        jobTitle: job.title,
      },
    });
  }

  async findAll(user:any, query?:ApplicationQueryDto) {
    const {where:condition, orderBy, skip, pageSize, currentPage} = paginateApplication(query)
    const where = user.role === 'Admin' ? condition:{...condition, userId:user.id}  
   
    const applications = await this.prisma.application.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      select:{
      user:{
        select:{
          id:true,
          email:true,
          role:true
        }
      },
      job:true,
      status:true,
      id:true,
      dateApplied:true
    }})
      
  // Total count for pagination
  const totalCount = await this.prisma.application.count({ where });

  return {
    applications,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage,
    totalCount,
  };
  }

  
  async findOne(id: string) {
    return await this.prisma.application.findFirst({where:{id}})
  }

  async update(id: string, data: UpdateApplicationDto) {
    return await this.prisma.application.update({
      data,
      where:{
        id
      }
    })
  }

  async remove(id: string) {
    await this.prisma.application.delete({where:{id}})
  }
  async getApplicationsOverTime( interval: 'day' | 'month' | 'year') {
  
     const applications = await this.prisma.application.findMany({
      select: {
        dateApplied: true,
      },
    });
    const groupedData = this.aggregateApplicationsByInterval(applications, interval);
    return groupedData;
    }
  
    private aggregateApplicationsByInterval(
      applications: { dateApplied: Date }[],
      interval: 'day' | 'month' | 'year',
    ) {
      const formatter = new Intl.DateTimeFormat('en-US', {
        day: interval === 'day' ? '2-digit' : undefined,
        month: interval !== 'year' ? '2-digit' : undefined,
        year: 'numeric',
      });
  
      const dateMap = new Map<string, number>();
  
      for (const application of applications) {
        const formattedDate = formatter.format(application.dateApplied);
        dateMap.set(formattedDate, (dateMap.get(formattedDate) || 0) + 1);
      }
      return Array.from(dateMap, ([date, count]) => ({ date, count }));
    }
  }
