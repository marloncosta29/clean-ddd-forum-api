import { Answer } from '../entities/answer'
import { QuestionComment } from '../entities/question-comment'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface FecthQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

interface FecthQuestionCommentUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FecthQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}
  async execute({
    questionId,
    page,
  }: FecthQuestionCommentUseCaseRequest): Promise<FecthQuestionCommentUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId({
        questionId,
        page,
      })
    return { questionComments }
  }
}
