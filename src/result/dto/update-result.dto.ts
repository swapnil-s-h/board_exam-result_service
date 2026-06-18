import { IsArray, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

import { UpdateSubjectResultDto } from './update-subject-result.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResultDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubjectResultDto)
  @ApiProperty({
    description: 'Subjects and marks of student to update result',
    type: [UpdateSubjectResultDto],
    example: [
      { subjectName: 'English', obtainedMarks: 39, totalMarks: 100 },
      { subjectName: 'Math', obtainedMarks: 33, totalMarks: 100 },
    ],
  })
  subjects!: UpdateSubjectResultDto[];
}
