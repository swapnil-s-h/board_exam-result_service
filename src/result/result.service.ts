import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entity/result.entity';
import { Repository } from 'typeorm';
import { SubjectResult } from './entity/subject-result.entity';
import { Subject } from './entity/subject.entity';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(SubjectResult)
    private readonly subjectResultRepository: Repository<SubjectResult>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async createResult(dto: CreateResultDto) {
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

  async getResult(studentId: number) {
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
    return result;
  }
}
