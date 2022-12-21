import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class QuoteService {
  private readonly quotes: string[] = [];
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async allQuotes() {
    return this.quotes;
  }

  async createQuote(quote: string) {
    this.quotes.push(quote);
    this.eventEmitter.emit('quote.created', {
      quote: this.quotes[this.quotes.length - 1],
    });
  }
}
