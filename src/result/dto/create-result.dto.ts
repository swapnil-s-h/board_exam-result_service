import {
  IsArray,
  IsDate,
  IsInt,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSubjectResultDto } from './create-subject-result.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @IsInt()
  @ApiProperty({
    description:
      'Student Id - should match with user_id in users table in user_service',
    type: Number,
    example: 1,
  })
  studentId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubjectResultDto)
  @ApiProperty({
    description: 'Subjects of the student with above student Id',
    type: [CreateSubjectResultDto],
    example: [
      { subjectName: 'English', obtainedMarks: 39, totalMarks: 100 },
      { subjectName: 'Math', obtainedMarks: 33, totalMarks: 100 },
    ],
  })
  subjects!: CreateSubjectResultDto[];
}

export class CreateResultResponseDto {
  @IsNumber()
  @ApiProperty({
    description: 'Student Id whose result is created',
    type: Number,
    example: 1,
  })
  studentId!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Result Id of newly create result',
    type: Number,
    example: 1,
  })
  resultId!: number;

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
}
