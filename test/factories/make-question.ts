import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { Question, QuestionProps } from '@src/domain/entities/question'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps>,
  id?: UniqueEntityId,
) {
  const newQuestion = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
  return newQuestion
}
