import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface FecthQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

interface FecthQuestionAnswerUseCaseResponse {
  answers: Answer[]
}

export class FecthQuestionAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    questionId,
    page,
  }: FecthQuestionAnswerUseCaseRequest): Promise<FecthQuestionAnswerUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId({
      questionId,
      page,
    })
    return { answers }
  }
}
