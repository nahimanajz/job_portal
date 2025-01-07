import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Job } from 'src/job/entities/job.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.applications, { eager: true })
  user: User;

  @ManyToOne(() => Job, (job) => job.applications, { eager: true })
  job: Job;

  @CreateDateColumn()
  dateApplied: Date;

  @Column({ type: 'enum', enum: ['Pending', 'Reviewed', 'Accepted'], default: 'Pending' })
  status: string;
}
