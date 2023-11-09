import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@src/domain/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnswerProps>,
  id?: UniqueEntityId,
) {
  const newAnswer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
  return newAnswer
}
