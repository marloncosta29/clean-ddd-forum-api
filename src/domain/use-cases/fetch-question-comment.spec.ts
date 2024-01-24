import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { FecthQuestionCommentUseCase } from './fetch-question-comment'
import { InMemoryQuestionCommentRepository } from 'test/repository/in-memory-question-comment-repository'
import { makeQuestionComment } from 'test/factories/make-comment-question'

let questionCommentRepository: InMemoryQuestionCommentRepository
let fetchQuestionCommentUseCase: FecthQuestionCommentUseCase

describe('Fetch Question Answer', () => {
  beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentRepository()
    fetchQuestionCommentUseCase = new FecthQuestionCommentUseCase(
      questionCommentRepository,
    )
  })

  it('should be able fetch question comments', async () => {
    await questionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )
    await questionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )
    await questionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-2') }),
    )
    await questionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-3') }),
    )

    const { questionComments } = await fetchQuestionCommentUseCase.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(2)
  })

  it('should be able to get question comments by page', async () => {
    for (let index = 0; index < 22; index++) {
      await questionCommentRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const { questionComments } = await fetchQuestionCommentUseCase.execute({
      questionId: 'question-1',
      page: 2,
    })
    expect(questionComments).toHaveLength(2)
  })
})
