import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'

let questionRepository: InMemoryQuestionsRepository
let createQuestionUseCase: CreateQuestionUseCase
describe('Create a Question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    createQuestionUseCase = new CreateQuestionUseCase(questionRepository)
  })

  it('should be acble to create a question', async () => {
    const { question } = await createQuestionUseCase.execute({
      title: 'a title question',
      authorId: '1',
      content: 'New queston from forum',
    })

    expect(question.content).toEqual('New queston from forum')
    expect(question.slug.value).toEqual('a-title-question')
  })
})
