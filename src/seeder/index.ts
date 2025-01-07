import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { JobService } from '../job/job.service';
import { CreateJobDto } from '../job/dto/create-job.dto';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const jobService = app.get(JobService);

  console.log('Seeding jobs...');

  for (let i = 0; i < 40; i++) {
    const createJobDto: CreateJobDto = {
      title: faker.name.jobTitle(),  
      category: faker.name.jobType(),
      location: `${faker.address.city()}, ${faker.address.country()}`,
      description: faker.lorem.paragraphs(2),
    };

    await jobService.create(createJobDto);
    console.log(`Job #${i + 1} seeded`);
  }

  console.log('Seeding completed!');
  await app.close();
}

bootstrap();
