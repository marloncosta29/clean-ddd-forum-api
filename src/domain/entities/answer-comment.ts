import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { Optional } from '@src/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answercomment = new AnswerComment(
      { ...props, createdAt: new Date() },
      id,
    )
    return answercomment
  }
}
