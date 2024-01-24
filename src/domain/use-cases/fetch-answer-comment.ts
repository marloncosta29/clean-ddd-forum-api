import { AnswerComment } from '../entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface FecthAnswerCommentUseCaseRequest {
  answerId: string
  page: number
}

interface FecthAnswerCommentUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FecthAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}
  async execute({
    answerId,
    page,
  }: FecthAnswerCommentUseCaseRequest): Promise<FecthAnswerCommentUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId({
        answerId,
        page,
      })
    return { answerComments }
  }
}
