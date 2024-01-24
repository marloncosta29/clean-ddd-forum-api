import { Answer } from '@src/domain/entities/answer'
import {
  AnswerRepository,
  FindManyByQuestionIdParams,
} from '@src/domain/repositories/answer-repository'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async findById(answerId: string): Promise<Answer | null> {
    const answer = await this.items.find(
      (item) => item.id.toString() === answerId,
    )

    if (!answer) {
      return null
    }
    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )
    this.items.splice(answerIndex, 1)
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[answerIndex] = answer
  }

  async findManyByQuestionId({
    page,
    questionId,
  }: FindManyByQuestionIdParams): Promise<Answer[]> {
    const answer = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
    return answer
  }
}
