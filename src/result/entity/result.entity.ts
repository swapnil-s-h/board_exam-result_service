import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { SubjectResult } from './subject-result.entity';

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn({
    name: 'result_id',
  })
  resultId!: number;

  @Column({
    name: 'student_id',
    unique: true,
  })
  studentId!: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @OneToMany(() => SubjectResult, (subjectResult) => subjectResult.result)
  subjectResults!: SubjectResult[];
}
