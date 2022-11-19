import { container } from 'inversify-props';

import { AuthRepository, QuizRepository, ResultsRepository } from './repositories'
import { AuthRepositoryType, QuizRepositoryType, ResultsRepositoryType } from './contracts'

/**
 * Registers (binds) all services/repositories to a container
 */
export default function initContainer (): void {
  container.bind<AuthRepository>(AuthRepositoryType).to(AuthRepository)
  container.bind<QuizRepository>(QuizRepositoryType).to(QuizRepository)
  container.bind<ResultsRepository>(ResultsRepositoryType).to(ResultsRepository)
}
