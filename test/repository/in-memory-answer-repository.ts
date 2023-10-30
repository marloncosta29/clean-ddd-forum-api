import { Answer } from "@src/domain/entities/answer";
import { AnswerRepository } from "@src/domain/repositories/answer-repository";

export class InMemoryAnswerRepository implements AnswerRepository{
    public items:Answer[] = []
    async create(answer: Answer): Promise<void> {
       this.items.push(answer)
    }
}