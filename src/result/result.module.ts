import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entity/result.entity';
import { Subject } from './entity/subject.entity';
import { SubjectResult } from './entity/subject-result.entity';
import { UserClientModule } from 'src/user-client/user-client.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Subject, SubjectResult]),
    UserClientModule,
    MessagingModule,
  ],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
