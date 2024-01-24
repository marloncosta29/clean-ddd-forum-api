import { AnswerComment } from '@src/domain/entities/answer-comment'
import {
  AnswerCommentRepository,
  FindManyByAnswerIdProps,
} from '@src/domain/repositories/answer-comment-repository'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  items: AnswerComment[] = []

  async create(comment: AnswerComment): Promise<void> {
    this.items.push(comment)
  }

  async delete(question: AnswerComment) {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(index, 1)
  }

  async findById(questionId: string): Promise<AnswerComment | null> {
    return this.items.find((item) => item.id.toString() === questionId) || null
  }

  async findManyByAnswerId({
    answerId,
    page,
  }: FindManyByAnswerIdProps): Promise<AnswerComment[]> {
    const answer = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
    return answer
  }
}
