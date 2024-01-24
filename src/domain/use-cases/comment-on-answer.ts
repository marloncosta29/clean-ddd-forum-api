import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { AnswerComment } from '../entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'
import { AnswerRepository } from '../repositories/answer-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found!')
    }
    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })
    await this.answerCommentRepository.create(answerComment)
    return { answerComment }
  }
}
