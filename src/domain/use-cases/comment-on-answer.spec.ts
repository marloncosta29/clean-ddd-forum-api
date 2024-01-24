import { makeAnswer } from 'test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentRepository } from 'test/repository/in-memory-answer-comment-repository'
import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'

let answerRepository: InMemoryAnswerRepository
let answerCommentRepository: InMemoryAnswerCommentRepository
let commentOnAnswerUseCase: CommentOnAnswerUseCase

describe('Choose best answer for a answer', () => {
  beforeEach(() => {
    answerCommentRepository = new InMemoryAnswerCommentRepository()
    answerRepository = new InMemoryAnswerRepository()
    commentOnAnswerUseCase = new CommentOnAnswerUseCase(
      answerRepository,
      answerCommentRepository,
    )
  })

  it('should be able to comment a answer', async () => {
    const answer = makeAnswer({})

    await answerRepository.create(answer)

    commentOnAnswerUseCase.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comentario teste',
    })

    expect(answerCommentRepository.items[0].content).toEqual('Comentario teste')
  })
})
