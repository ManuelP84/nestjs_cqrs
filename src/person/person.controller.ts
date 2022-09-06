import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPersonQuery } from './queries/impl/get-person.query';
import { CreatePersonCommand } from './commands/impl/create-person.command';

@Controller('person')
export class PersonController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('all')
  async getAll() {
    return await this.queryBus.execute(new GetPersonQuery());
  }

  @Post('add')
  @UsePipes(new ValidationPipe({transform: true}))
  async save(@Body() payload: CreatePersonCommand) {
    await this.commandBus.execute(payload);
  }
}
