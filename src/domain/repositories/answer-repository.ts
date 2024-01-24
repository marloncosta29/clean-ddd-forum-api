import { PaginationParams } from '@src/core/repositories/pagination-params'
import { Answer } from '../entities/answer'

export type FindManyByQuestionIdParams = {
  questionId: string
} & PaginationParams

export interface AnswerRepository {
  findById(answerId: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(params: FindManyByQuestionIdParams): Promise<Answer[]>
}
