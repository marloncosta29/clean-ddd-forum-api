import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@src/domain/entities/question-comment'

export function makeQuestionComment(
  override?: Partial<QuestionCommentProps>,
  id?: UniqueEntityId,
) {
  const newQuestionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
  return newQuestionComment
}
