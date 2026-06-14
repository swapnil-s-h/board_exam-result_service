import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagingService } from './messaging.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: process.env.RESULT_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
