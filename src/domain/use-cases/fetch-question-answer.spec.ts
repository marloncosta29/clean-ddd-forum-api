import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'
import { FecthQuestionAnswerUseCase } from './fetch-question-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'

let answerRepository: InMemoryAnswerRepository
let fetchQuestionAnswerUseCase: FecthQuestionAnswerUseCase

describe('Fetch Question Answer', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    fetchQuestionAnswerUseCase = new FecthQuestionAnswerUseCase(
      answerRepository,
    )
  })

  it('should be able fetch question answer', async () => {
    await answerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await answerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await answerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-2') }),
    )
    await answerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-3') }),
    )

    const { answers } = await fetchQuestionAnswerUseCase.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(2)
  })

  it('should be able to get question answers by page', async () => {
    for (let index = 0; index < 22; index++) {
      await answerRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const { answers } = await fetchQuestionAnswerUseCase.execute({
      questionId: 'question-1',
      page: 2,
    })
    expect(answers).toHaveLength(2)
  })
})
