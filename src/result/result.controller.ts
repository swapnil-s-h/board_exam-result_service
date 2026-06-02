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
import { CreateResultDto } from './dto/create-result.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from './interface/jwt-payload.interface';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @Roles(Role.moderator)
  createResult(@Body() dto: CreateResultDto) {
    return this.resultService.createResult(dto);
  }

  @Get('student/:studentId')
  @Roles(Role.moderator)
  getResult(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.resultService.getResultByStudentId(studentId);
  }

  @Get('all')
  @Roles(Role.moderator)
  getAllResults() {
    return this.resultService.getAllResults();
  }

  @Get('me')
  @Roles(Role.student)
  getMyResult(@GetUser() user: JwtPayload) {
    return this.resultService.getResultByStudentId(user.sub);
  }

  @Put(':id')
  @Roles(Role.moderator)
  updateResult(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResultDto,
  ) {
    return this.resultService.updateResult(id, dto);
  }

  @Delete(':id')
  @Roles(Role.moderator)
  deleteResult(@Param('id', ParseIntPipe) resultId: number) {
    return this.resultService.deleteResult(resultId);
  }
}
