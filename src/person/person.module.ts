import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { GetPersonHandler } from './queries/handler/get-person.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePersonHandler } from './commands/handler/create-person.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [GetPersonHandler, CreatePersonHandler],
})
export class PersonModule {}
