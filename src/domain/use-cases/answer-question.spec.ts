import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repository/in-memory-answer-repository'

let answerRepository: InMemoryAnswerRepository
let answerQuestionUseCase: AnswerQuestionUseCase
describe("Create a Answer", () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    answerQuestionUseCase = new AnswerQuestionUseCase(answerRepository)

  })
  it('should be able to create a question', async () => {

    const { answer } = await answerQuestionUseCase.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
  })

})

