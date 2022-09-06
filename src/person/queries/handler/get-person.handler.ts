import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPersonQuery } from '../impl/get-person.query';
import { Person } from '../../../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@QueryHandler(GetPersonQuery)
export class GetPersonHandler implements IQueryHandler<GetPersonQuery> {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async execute(query: GetPersonQuery): Promise<Person[]> {
    return await this.personRepository.find();
  }
}
