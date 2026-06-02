import { IsInt, IsString, Min } from 'class-validator';

export class UpdateSubjectResultDto {
  @IsString()
  subjectName!: string;

  @IsInt()
  @Min(0)
  obtainedMarks!: number;

  @IsInt()
  @Min(1)
  totalMarks!: number;
}
