import { Answer } from '@src/domain/entities/answer'
import { AnswerRepository } from '@src/domain/repositories/answer-repository'

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
}
