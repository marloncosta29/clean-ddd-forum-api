import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { FecthAnswerCommentUseCase } from './fetch-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repository/in-memory-answer-comment-repository'
import { makeAnswerComment } from 'test/factories/make-comment-answer'

let answerCommentRepository: InMemoryAnswerCommentRepository
let fetchAnswerCommentUseCase: FecthAnswerCommentUseCase

describe('Fetch Answer Answer', () => {
  beforeEach(() => {
    answerCommentRepository = new InMemoryAnswerCommentRepository()
    fetchAnswerCommentUseCase = new FecthAnswerCommentUseCase(
      answerCommentRepository,
    )
  })

  it('should be able fetch answer comments', async () => {
    await answerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await answerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await answerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-2') }),
    )
    await answerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-3') }),
    )

    const { answerComments } = await fetchAnswerCommentUseCase.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(2)
  })

  it('should be able to get answer comments by page', async () => {
    for (let index = 0; index < 22; index++) {
      await answerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const { answerComments } = await fetchAnswerCommentUseCase.execute({
      answerId: 'answer-1',
      page: 2,
    })
    expect(answerComments).toHaveLength(2)
  })
})
