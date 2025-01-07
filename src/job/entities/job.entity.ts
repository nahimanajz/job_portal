import { Application } from 'src/application/entity/application.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 50 })
  category: string;

  @Column({ length: 100 })
  location: string;
  
  @Column('text')
  description: string;
  
  @CreateDateColumn({ type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];

}
