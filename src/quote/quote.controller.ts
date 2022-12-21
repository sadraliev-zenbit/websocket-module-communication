import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
  @Get()
  async getAllQuotes() {
    try {
      return await this.quoteService.allQuotes();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    try {
      const { quote } = createQuoteDto;
      await this.quoteService.createQuote(quote);
      return 'quote was created!';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
