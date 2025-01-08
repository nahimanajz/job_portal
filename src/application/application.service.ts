import { ConflictException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findAll() {
    return await this.prisma.application.findMany({ select:{
      user:{
        select:{
          id:true,
          email:true,
          role:true
        }
      },
      job:true,
      status:true,
      id:true
    }})
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
}
