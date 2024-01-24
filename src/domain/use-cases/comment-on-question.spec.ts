import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentRepository } from 'test/repository/in-memory-question-comment-repository'

let questionRepository: InMemoryQuestionsRepository
let questionCommentRepository: InMemoryQuestionCommentRepository
let commentOnQuestionUseCase: CommentOnQuestionUseCase

describe('Choose best answer for a question', () => {
  beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentRepository()
    questionRepository = new InMemoryQuestionsRepository()
    commentOnQuestionUseCase = new CommentOnQuestionUseCase(
      questionRepository,
      questionCommentRepository,
    )
  })

  it('should be able to comment a question', async () => {
    const question = makeQuestion({})

    await questionRepository.create(question)

    commentOnQuestionUseCase.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Comentario teste',
    })

    expect(questionCommentRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
