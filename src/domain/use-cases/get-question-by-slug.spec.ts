import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'

let questionRepository: InMemoryQuestionsRepository
let getQuestionBySugUseCase: GetQuestionBySlugUseCase
describe('Get Question By slug', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    getQuestionBySugUseCase = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be acble to create a question', async () => {
    const newQuestion = makeQuestion({
      title: 'a title question',
      content: 'New queston from forum',
    })

    questionRepository.create(newQuestion)
    const { question } = await getQuestionBySugUseCase.execute({
      slug: 'a-title-question',
    })

    expect(question?.content).toEqual('New queston from forum')
    expect(question?.slug.value).toEqual('a-title-question')
  })
})
