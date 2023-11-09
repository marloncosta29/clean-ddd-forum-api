import { Question } from '../entities/question'

export interface QuestionRepository {
  findById(questionId: string): Promise<Question | undefined>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  getBySlug(slug: string): Promise<Question | undefined>
}
