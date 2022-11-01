import { container } from 'inversify-props';

import { AuthRepository, QuizRepository } from './repositories'
import { AuthRepositoryType, QuizRepositoryType } from './contracts'

/**
 * Registers (binds) all services/repositories to a container
 */
export default function initContainer (): void {
  container.bind<AuthRepository>(AuthRepositoryType).to(AuthRepository)
  container.bind<QuizRepository>(QuizRepositoryType).to(QuizRepository)
}
