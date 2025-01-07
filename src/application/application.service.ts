import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Job } from 'src/job/entities/job.entity';
import { Application } from './entity/application.entity';
import { User } from 'src/user/entity/user.entity';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
 
  constructor(
    @InjectRepository(Application) private applicationRepo: Repository<Application>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
  ) {}

  async applyForJob(user: User, createApplicationDto: CreateApplicationDto): Promise<Application> {
    const job = await this.jobRepo.findOne({ where: { id: createApplicationDto.jobId } });

    if (!job) throw new NotFoundException('Job not found');

    // Check if the user has already applied
    const existingApplication = await this.applicationRepo.findOne({
      where: { user: { id: user.id }, job: { id: job.id } },
    });

    if (existingApplication) throw new ForbiddenException('You have already applied for this job');

    const application = this.applicationRepo.create({ user, job });
    return await this.applicationRepo.save(application);
  }

  async findApplicationsByUser(user: User): Promise<Application[]> {
    return await this.applicationRepo.find({ where: { user: { id: user.id } } });
  }

  async findAll(): Promise<Application[]>{
      return await this.applicationRepo.find()
  }

  async update(id: number, data:UpdateApplicationDto ): Promise<Application> {
    await this.applicationRepo.update(id, data);
    return await this.applicationRepo.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.applicationRepo.delete(id);
  }
  
}
