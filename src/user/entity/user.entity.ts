import { Application } from 'src/application/entity/application.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  userRole: string; // Could be 'admin', 'user', etc.

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
