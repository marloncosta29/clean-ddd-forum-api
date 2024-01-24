import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'test/repository/in-memory-answer-comment-repository'
import { DeleteAnswerCommentUseCase } from './delete-comment-answer'
import { makeAnswerComment } from 'test/factories/make-comment-answer'

let answercommentRepository: InMemoryAnswerCommentRepository
let deleteAnswerCommentUseCase: DeleteAnswerCommentUseCase
describe('Delete a AnswerComment', () => {
  beforeEach(() => {
    answercommentRepository = new InMemoryAnswerCommentRepository()
    deleteAnswerCommentUseCase = new DeleteAnswerCommentUseCase(
      answercommentRepository,
    )
  })

  it('should be able to delete a answercomment', async () => {
    const newAnswerComment = makeAnswerComment(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answercomment-1'),
    )

    await answercommentRepository.create(newAnswerComment)

    await deleteAnswerCommentUseCase.execute({
      answercommentId: 'answercomment-1',
      authorId: 'author-1',
    })
    expect(answercommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answercomment', async () => {
    const newAnswerComment = makeAnswerComment(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answercomment-1'),
    )

    await answercommentRepository.create(newAnswerComment)
    expect(async () => {
      await deleteAnswerCommentUseCase.execute({
        answercommentId: 'answercomment-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
