import { InMemoryQuestionsRepository } from 'test/repository/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'

let answerRepository: InMemoryAnswerRepository
let questionRepository: InMemoryQuestionsRepository
let chooseQuestionBestAnswerUseCase: ChooseQuestionBestAnswerUseCase

describe('Choose best answer for a question', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    questionRepository = new InMemoryQuestionsRepository()
    chooseQuestionBestAnswerUseCase = new ChooseQuestionBestAnswerUseCase(questionRepository, answerRepository)
  })

  it('should be able to choose best question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    const newAnswer = makeAnswer({ questionId: newQuestion.id })
    await questionRepository.create(newQuestion)
    await answerRepository.create(newAnswer)

  
    const {question} = await chooseQuestionBestAnswerUseCase.execute({
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString()
    })
    expect(question.bestAnswerId?.toString()).toEqual(newAnswer.id.toString())
  })

  it('should not be able choose best question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    const newAnswer = makeAnswer({ questionId: newQuestion.id })
    await questionRepository.create(newQuestion)
    await answerRepository.create(newAnswer)

  
    const { question } = await chooseQuestionBestAnswerUseCase.execute({
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString()
    })

    expect(async () => {
      await chooseQuestionBestAnswerUseCase.execute({
        authorId: question.authorId.toString(),
        answerId: '1234565'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
