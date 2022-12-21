import { Module } from '@nestjs/common';
import { NotifierGateway } from './notifier.gateway';

@Module({
  providers: [NotifierGateway],
})
export class NotifierModule {}
