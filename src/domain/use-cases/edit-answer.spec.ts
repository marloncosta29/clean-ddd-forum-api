import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'

let answerRepository: InMemoryAnswerRepository
let editAnswerUseCase: EditAnswerUseCase
describe('Edit a Answer', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    editAnswerUseCase = new EditAnswerUseCase(answerRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
    )

    await answerRepository.create(newAnswer)

    await editAnswerUseCase.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'changed content'
    })
    expect(answerRepository.items[0]).toMatchObject({
      content: 'changed content'
    })
  })

  it('should not be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(newAnswer)
    expect(async () => {
      await editAnswerUseCase.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'changed content'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
