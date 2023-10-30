import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
import { Question } from '../entities/question'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionRepository } from '../repositories/question-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityId(authorId),
      title
    })
    await this.questionRepository.create(question)
    return {question}
  }
}
