import { PaginationParams } from '@src/core/repositories/pagination-params'
import { QuestionComment } from '../entities/question-comment'

export type FindManyByQuestionIdProps = {
  questionId: string
} & PaginationParams

export interface QuestionCommentRepository {
  create(comment: QuestionComment): Promise<void>
  delete(comment: QuestionComment): Promise<void>

  findById(commentId: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    props: FindManyByQuestionIdProps,
  ): Promise<QuestionComment[]>
}
