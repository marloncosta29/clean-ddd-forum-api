import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'

let answerRepository: InMemoryAnswerRepository
let deleteAnswerUseCase: DeleteAnswerUseCase
describe('Create a Answer', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    deleteAnswerUseCase = new DeleteAnswerUseCase(answerRepository)
  })

  it('should be able to delete a Answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(newAnswer)

    await deleteAnswerUseCase.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })
    expect(answerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a Answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(newAnswer)
    expect(async () => {
      await deleteAnswerUseCase.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
