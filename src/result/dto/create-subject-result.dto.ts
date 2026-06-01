import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class CreateSubjectResultDto {
  @IsString()
  @MaxLength(100)
  subjectName!: string;

  @IsInt()
  @Min(0)
  obtainedMarks!: number;

  @IsInt()
  @Min(1)
  totalMarks!: number;
}
