import { PaginationParams } from '@src/core/repositories/pagination-params'
import { Question } from '@src/domain/entities/question'
import { QuestionRepository } from '@src/domain/repositories/question-repository'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(question: Question) {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    this.items.splice(questionIndex, 1)
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )
    this.items[questionIndex] = question
  }

  async findById(questionId: string): Promise<Question | undefined> {
    return this.items.find((item) => item.id.toString() === questionId)
  }

  async fintManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async getBySlug(slug: string): Promise<Question | undefined> {
    return this.items.find((item) => item.slug.value === slug)
  }
}
