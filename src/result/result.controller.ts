import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @Roles(Role.moderator)
  createResult(@Body() dto: CreateResultDto) {
    return this.resultService.createResult(dto);
  }

  @Get('student/:studentId')
  getResult(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.resultService.getResult(studentId);
  }

  @Get('test')
  getTest(@GetUser() user) {
    return user;
  }
}
