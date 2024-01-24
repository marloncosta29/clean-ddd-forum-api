import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'

let questionRepository: InMemoryQuestionsRepository
let fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    fetchRecentQuestionsUseCase = new FetchRecentQuestionsUseCase(
      questionRepository,
    )
  })

  it('should be able fetch recent questions', async () => {
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )

    const { questions } = await fetchRecentQuestionsUseCase.execute({ page: 1 })
    expect(questions).toHaveLength(3)
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able fetch recent questions by page', async () => {
    for (let index = 0; index < 22; index++) {
      await questionRepository.create(makeQuestion({}))
    }
    const { questions } = await fetchRecentQuestionsUseCase.execute({ page: 2 })
    expect(questions).toHaveLength(2)
  })
})
