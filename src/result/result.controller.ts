import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ResultService } from './result.service';
import {
  CreateResultDto,
  CreateResultResponseDto,
} from './dto/create-result.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from './interface/jwt-payload.interface';
import { UpdateResultDto } from './dto/update-result.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetResultDto } from './dto/get-result.dto';

@Controller('result')
@ApiBearerAuth()
@ApiTags('result')
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @Roles(Role.moderator)
  @ApiOperation({ summary: 'Create new result' })
  @ApiBody({
    description: 'New result data to create new result',
    type: CreateResultDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only MODERATOR can create result for a student',
  })
  @ApiNotFoundResponse({
    description:
      'User not found - student with given student id does not exist',
    example: 'User not found',
  })
  @ApiBadRequestResponse({
    description: 'Given user id is of MODERATOR',
    example: 'Result can only be assigned to a student',
  })
  @ApiConflictResponse({
    description: 'Result cannot be created more than once for the same student',
    example: 'Result already exists for this student',
  })
  @ApiCreatedResponse({
    description: 'Result created',
    type: CreateResultResponseDto,
  })
  createResult(@Body() dto: CreateResultDto) {
    return this.resultService.createResult(dto);
  }

  @Get('student/:studentId')
  @Roles(Role.moderator)
  @ApiOperation({ summary: 'Fetch result data of a specific student' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The id of the student whose result is to be fetched',
    example: 1,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only MODERATOR can view result of any student',
  })
  @ApiNotFoundResponse({
    description:
      'Student with given id does not exist OR Result for the given student is not created yet',
    example: 'Student not found',
  })
  @ApiOkResponse({
    description: 'Result for the given student fetched successfully',
    type: GetResultDto,
  })
  getResult(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.resultService.getResultByStudentId(studentId);
  }

  @Get('all')
  @Roles(Role.moderator)
  @ApiOperation({ summary: 'Fetch result data of all students' })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only MODERATOR can view result of all students',
  })
  @ApiOkResponse({
    description: 'All results fetched successfully',
    type: [GetResultDto],
  })
  getAllResults() {
    return this.resultService.getAllResults();
  }

  @Get('me')
  @Roles(Role.student)
  @ApiOperation({ summary: 'View result of currently logged in student' })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only STUDENT can view his/her own result',
  })
  @ApiOkResponse({
    description: 'Result of currently logged in student fetched successfully',
    type: GetResultDto,
  })
  getMyResult(@GetUser() user: JwtPayload) {
    return this.resultService.getMyResult(user.sub);
  }

  @Put(':id')
  @Roles(Role.moderator)
  @ApiOperation({ summary: 'Edit a specific result by result id' })
  @ApiBody({
    description: 'Update existing result',
    type: UpdateResultDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The id of the result which is to be edited',
    example: 1,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only MODERATOR can update students result',
  })
  @ApiNotFoundResponse({
    description:
      'Result not found - result with given result id does not exist',
    example: 'Result not found',
  })
  @ApiOkResponse({
    description: 'Result updated successfully',
    type: GetResultDto,
  })
  updateResult(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResultDto,
  ) {
    return this.resultService.updateResult(id, dto);
  }

  @Delete(':id')
  @Roles(Role.moderator)
  @ApiOperation({ summary: 'Delete a specific result by result id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The id of the result which is to be deleted',
    example: 1,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Only MODERATOR can delete a result',
  })
  @ApiNotFoundResponse({
    description:
      'Result not found - result with given result id does not exist',
    example: 'Result not found',
  })
  @ApiOkResponse({
    description: 'Result deleted successfully',
    example: {
      message: 'Result deleted successfully',
    },
  })
  deleteResult(@Param('id', ParseIntPipe) resultId: number) {
    return this.resultService.deleteResult(resultId);
  }
}
