import { IsArray, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

import { UpdateSubjectResultDto } from './update-subject-result.dto';

export class UpdateResultDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubjectResultDto)
  subjects!: UpdateSubjectResultDto[];
}
