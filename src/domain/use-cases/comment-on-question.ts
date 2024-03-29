import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { QuestionComment } from '../entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { QuestionRepository } from '../repositories/question-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found!')
    }
    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })
    await this.questionCommentRepository.create(questionComment)
    return { questionComment }
  }
}
