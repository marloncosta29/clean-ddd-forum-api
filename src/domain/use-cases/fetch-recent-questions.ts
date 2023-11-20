import { Question } from "../entities/question"
import { QuestionRepository } from "../repositories/question-repository"

interface FetchRecentQuestionsUseCaseRequest {
    page: number
}

interface FetchRecentQuestionsUseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionRepository) { }

    async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.fintManyRecent({ page })

        return { questions }
    }
}