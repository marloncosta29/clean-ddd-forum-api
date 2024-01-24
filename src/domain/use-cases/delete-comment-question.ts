import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface DeleteQuestionCommentUseCaseRequest {
  questioncommentId: string
  authorId: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteQuestionCommentUseCaseResponse = {}

export class DeleteQuestionCommentUseCase {
  constructor(private questioncommentRepository: QuestionCommentRepository) {}

  async execute({
    questioncommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment =
      await this.questioncommentRepository.findById(questioncommentId)

    if (!questioncomment) {
      throw new Error('QuestionComment not found')
    }

    if (authorId !== questioncomment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questioncommentRepository.delete(questioncomment)
    return { questioncomment }
  }
}
