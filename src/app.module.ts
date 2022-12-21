import { Module } from '@nestjs/common';
import { QuoteModule } from './quote/quote.module';
import { NotifierModule } from './notifier/notifier.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [QuoteModule, NotifierModule, EventEmitterModule.forRoot()],
})
export class AppModule {}
