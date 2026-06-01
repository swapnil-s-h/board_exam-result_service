import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Result } from './result.entity';
import { Subject } from './subject.entity';

@Entity('subject_result')
@Check(`"obtained_marks" <= "total_marks"`)
export class SubjectResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'total_marks',
  })
  totalMarks!: number;

  @Column({
    name: 'obtained_marks',
  })
  obtainedMarks!: number;

  @ManyToOne(() => Result, (result) => result.subjectResults, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'result_id',
  })
  result!: Result;

  @ManyToOne(() => Subject, (subject) => subject.subjectResults)
  @JoinColumn({
    name: 'subject_id',
  })
  subject!: Subject;
}
