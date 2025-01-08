import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {

    constructor(private prisma: PrismaService){}
    
    
   async findAll() {
        return await this.prisma.job.findMany();
    }
}