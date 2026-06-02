import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entity/result.entity';
import { SubjectResult } from './entity/subject-result.entity';
import { Subject } from './entity/subject.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { UserClientService } from 'src/user-client/user-client.service';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(SubjectResult)
    private readonly subjectResultRepository: Repository<SubjectResult>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private readonly userClientService: UserClientService,
  ) {}

  async createResult(dto: CreateResultDto) {
    const user = await this.userClientService.getUserById(dto.studentId);
    console.log(user);
    if (user.data.role !== Role.student) {
      throw new BadRequestException('Result can only be assigned to a student');
    }

    const existingResult = await this.resultRepository.findOne({
      where: {
        studentId: dto.studentId,
      },
    });
    if (existingResult) {
      throw new ConflictException('Result already exists for this student');
    }

    const result = await this.resultRepository.save({
      studentId: dto.studentId,
    });

    for (const subjectData of dto.subjects) {
      let subject = await this.subjectRepository.findOne({
        where: {
          subjectName: subjectData.subjectName,
        },
      });
      if (!subject) {
        subject = await this.subjectRepository.save({
          subjectName: subjectData.subjectName,
        });
      }
      await this.subjectResultRepository.save({
        result,
        subject,
        obtainedMarks: subjectData.obtainedMarks,
        totalMarks: subjectData.totalMarks,
      });
    }
    return result;
  }

  async getResultByStudentId(studentId: number) {
    const result = await this.resultRepository.findOne({
      where: {
        studentId,
      },
      relations: {
        subjectResults: {
          subject: true,
        },
      },
    });
    if (!result) throw new NotFoundException('Student not found');
    return result;
  }

  async getAllResults() {
    return this.resultRepository.find({
      relations: {
        subjectResults: {
          subject: true,
        },
      },
    });
  }

  async updateResult(resultId: number, dto: UpdateResultDto) {
    const result = await this.resultRepository.findOne({
      where: {
        resultId,
      },
    });

    if (!result) {
      throw new NotFoundException('Result not found');
    }

    await this.subjectResultRepository.delete({
      result: {
        resultId,
      },
    });

    for (const subjectData of dto.subjects) {
      let subject = await this.subjectRepository.findOne({
        where: {
          subjectName: subjectData.subjectName,
        },
      });
      if (!subject) {
        subject = await this.subjectRepository.save({
          subjectName: subjectData.subjectName,
        });
      }
      await this.subjectResultRepository.save({
        result,
        subject,
        obtainedMarks: subjectData.obtainedMarks,
        totalMarks: subjectData.totalMarks,
      });
    }
    return this.getResultByStudentId(result.studentId);
  }

  async deleteResult(resultId: number) {
    const result = await this.resultRepository.findOne({
      where: {
        resultId,
      },
    });

    if (!result) {
      throw new NotFoundException('Result not found');
    }

    await this.resultRepository.delete(resultId);

    return {
      message: 'Result deleted successfully',
    };
  }
}
