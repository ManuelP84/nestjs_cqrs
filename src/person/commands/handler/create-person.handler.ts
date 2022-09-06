import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePersonCommand } from '../impl/create-person.command';
import { Repository } from 'typeorm';
import { Person } from "src/entities/person.entity";

@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler implements ICommandHandler<CreatePersonCommand>{
     
    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    ){}
    async execute(command: CreatePersonCommand): Promise<any> {
        const newPerson = new Person();
        newPerson.age = command.age;
        newPerson.name = command.name;

        await this.personRepository.insert(newPerson);
    }
}
