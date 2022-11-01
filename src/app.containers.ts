import { container } from 'inversify-props';

import { AuthRepository, AuthRepositoryType } from './repositories/auth.repository'

/**
 * Registers (binds) all services/repositories to a container
 */
export default function initContainer (): void {
  container.bind<AuthRepository>(AuthRepositoryType).to(AuthRepository)
}
