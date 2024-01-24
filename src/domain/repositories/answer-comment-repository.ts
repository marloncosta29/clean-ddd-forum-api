import { PaginationParams } from '@src/core/repositories/pagination-params'
import { AnswerComment } from '../entities/answer-comment'

export type FindManyByAnswerIdProps = { answerId: string } & PaginationParams

export interface AnswerCommentRepository {
  create(comment: AnswerComment): Promise<void>
  delete(comment: AnswerComment): Promise<void>

  findById(commentId: string): Promise<AnswerComment | null>
  findManyByAnswerId(props: FindManyByAnswerIdProps): Promise<AnswerComment[]>
}
