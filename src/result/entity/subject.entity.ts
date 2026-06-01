import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectResult } from './subject-result.entity';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn({
    name: 'subject_id',
  })
  subjectId!: number;

  @Column({
    name: 'subject_name',
    unique: true,
    length: 100,
  })
  subjectName!: string;

  @OneToMany(() => SubjectResult, (subjectResult) => subjectResult.subject)
  subjectResults!: SubjectResult[];
}
