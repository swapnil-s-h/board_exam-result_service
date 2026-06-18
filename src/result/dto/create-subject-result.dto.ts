import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class CreateSubjectResultDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'Subject Name',
  })
  subjectName!: string;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Obtained Marks',
    type: Number,
  })
  obtainedMarks!: number;

  @IsInt()
  @Min(1)
  @ApiProperty({
    description:
      'Total Marks; totalMarks should always be greater than or equal to obtainedMarks',
    type: Number,
  })
  totalMarks!: number;
}
