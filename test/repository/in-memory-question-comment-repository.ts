import { QuestionComment } from '@src/domain/entities/question-comment'
import {
  FindManyByQuestionIdProps,
  QuestionCommentRepository,
} from '@src/domain/repositories/question-comment-repository'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  items: QuestionComment[] = []

  async create(comment: QuestionComment): Promise<void> {
    this.items.push(comment)
  }

  async delete(question: QuestionComment) {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(index, 1)
  }

  async findById(questionId: string): Promise<QuestionComment | null> {
    return this.items.find((item) => item.id.toString() === questionId) || null
  }

  async findManyByQuestionId({
    page,
    questionId,
  }: FindManyByQuestionIdProps): Promise<QuestionComment[]> {
    const answer = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
    return answer
  }
}
