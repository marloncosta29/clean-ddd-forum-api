import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface DeleteAnswerCommentUseCaseRequest {
  answercommentId: string
  authorId: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteAnswerCommentUseCaseResponse = {}

export class DeleteAnswerCommentUseCase {
  constructor(private answercommentRepository: AnswerCommentRepository) {}

  async execute({
    answercommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment =
      await this.answercommentRepository.findById(answercommentId)

    if (!answercomment) {
      throw new Error('AnswerComment not found')
    }

    if (authorId !== answercomment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answercommentRepository.delete(answercomment)
    return { answercomment }
  }
}
