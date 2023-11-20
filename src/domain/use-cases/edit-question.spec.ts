import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let questionRepository: InMemoryQuestionsRepository
let editQuestionUseCase: EditQuestionUseCase
describe('Edit a Question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    editQuestionUseCase = new EditQuestionUseCase(questionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
    )

    await questionRepository.create(newQuestion)

    await editQuestionUseCase.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'changed title',
      content: 'changed content'
    })
    expect(questionRepository.items[0]).toMatchObject({
      title: 'changed title',
      content: 'changed content'
    })
  })

  it('should not be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionRepository.create(newQuestion)
    expect(async () => {
      await editQuestionUseCase.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'changed title',
        content: 'changed content'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
