import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

class SubjectDto {
  @IsNumber()
  @ApiProperty({
    description: 'Unique identifier of subject in subject table',
    type: Number,
    example: 1,
  })
  subjectId!: number;

  @IsString()
  @ApiProperty({
    description: 'Name of the subject',
    example: 'Math',
  })
  subjectName!: string;
}

class SubjectResultDto {
  @IsNumber()
  @ApiProperty({
    description: 'Unique row identifier of subject_result table',
    type: Number,
    example: 1,
  })
  id!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Total Marks',
    type: Number,
    example: 100,
  })
  totalMarks!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Obtained Marks',
    type: Number,
    example: 39,
  })
  obtainedMarks!: number;

  @ApiProperty({ type: () => SubjectDto })
  @Type(() => SubjectDto)
  subject!: SubjectDto;
}

export class GetResultDto {
  @IsNumber()
  @ApiProperty({
    description: 'Result Id',
    type: Number,
    example: 1,
  })
  resultId!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Student Id',
    type: Number,
    example: 1,
  })
  studentId!: number;

  @IsDate()
  @ApiProperty({
    description: 'Timestamp at which result is created',
    type: Date,
    example: '2026-06-18T06:35:59.391Z',
  })
  createdAt!: Date;

  @IsDate()
  @ApiProperty({
    description: 'Timestamp at which result was last modified',
    type: Date,
    example: '2026-06-18T06:35:59.391Z',
  })
  updatedAt!: Date;

  @IsArray()
  @Type(() => SubjectResultDto)
  @ApiProperty({
    description: 'Subject wise obtained marks and total marks',
    type: [SubjectResultDto],
  })
  subjectResults!: SubjectResultDto[];
}
