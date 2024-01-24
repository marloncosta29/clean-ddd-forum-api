import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@src/domain/entities/answer-comment'

export function makeAnswerComment(
  override?: Partial<AnswerCommentProps>,
  id?: UniqueEntityId,
) {
  const newAnswerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
  return newAnswerComment
}
