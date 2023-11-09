import { Answer } from '../entities/answer'

export interface AnswerRepository {
  findById(answerId: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
