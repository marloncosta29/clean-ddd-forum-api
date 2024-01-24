import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { Optional } from '@src/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questioncomment = new QuestionComment(
      { ...props, createdAt: new Date() },
      id,
    )
    return questioncomment
  }
}
