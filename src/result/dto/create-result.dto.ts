import { IsArray, IsInt, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

import { CreateSubjectResultDto } from './create-subject-result.dto';

export class CreateResultDto {
  @IsInt()
  studentId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubjectResultDto)
  subjects!: CreateSubjectResultDto[];
}
