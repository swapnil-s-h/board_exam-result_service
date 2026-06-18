import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class UpdateSubjectResultDto {
  @IsString()
  @ApiProperty({
    description: 'Subject Name',
    example: 'Math',
  })
  subjectName!: string;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Obtained Marks',
    type: Number,
    example: 39,
  })
  obtainedMarks!: number;

  @IsInt()
  @Min(1)
  @ApiProperty({
    description:
      'Total Marks; totalMarks should always be greater than or equal to obtainedMarks',
    type: Number,
    example: 100,
  })
  totalMarks!: number;
}
