import { Question } from "@src/domain/entities/question";
import { QuestionRepository } from "@src/domain/repositories/question-repository";

export class InMemoryQuestionsRepository implements QuestionRepository{

    public items:Question[] = []
    async create(question: Question): Promise<void> {
       this.items.push(question)
    }
    async getBySlug(slug: string): Promise<Question | undefined> {
        return this.items.find(item => item.slug.value === slug)
    }
}