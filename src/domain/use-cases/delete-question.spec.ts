import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'

let questionRepository: InMemoryQuestionsRepository
let deleteQuestionUseCase: DeleteQuestionUseCase
describe('Create a Question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    deleteQuestionUseCase = new DeleteQuestionUseCase(questionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(newQuestion)

    await deleteQuestionUseCase.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })
    expect(questionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(newQuestion)
    expect(async () => {
      await deleteQuestionUseCase.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
