import { Module } from '@nestjs/common';
import { UserClientService } from './user-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserClientModule {}
