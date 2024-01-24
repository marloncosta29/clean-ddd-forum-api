import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { InMemoryQuestionCommentRepository } from 'test/repository/in-memory-question-comment-repository'
import { DeleteQuestionCommentUseCase } from './delete-comment-question'
import { makeQuestionComment } from 'test/factories/make-comment-question'

let questioncommentRepository: InMemoryQuestionCommentRepository
let deleteQuestionCommentUseCase: DeleteQuestionCommentUseCase
describe('Delete a QuestionComment', () => {
  beforeEach(() => {
    questioncommentRepository = new InMemoryQuestionCommentRepository()
    deleteQuestionCommentUseCase = new DeleteQuestionCommentUseCase(
      questioncommentRepository,
    )
  })

  it('should be able to delete a questioncomment', async () => {
    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('questioncomment-1'),
    )

    await questioncommentRepository.create(newQuestionComment)

    await deleteQuestionCommentUseCase.execute({
      questioncommentId: 'questioncomment-1',
      authorId: 'author-1',
    })
    expect(questioncommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a questioncomment', async () => {
    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('questioncomment-1'),
    )

    await questioncommentRepository.create(newQuestionComment)
    expect(async () => {
      await deleteQuestionCommentUseCase.execute({
        questioncommentId: 'questioncomment-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
