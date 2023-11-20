import { PaginationParams } from '@src/core/repositories/pagination-params'
import { Question } from '../entities/question'

export interface QuestionRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findById(questionId: string): Promise<Question | undefined>
  fintManyRecent(params: PaginationParams): Promise<Question[]>
  getBySlug(slug: string): Promise<Question | undefined>

}
