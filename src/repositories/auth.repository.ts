import { injectable } from 'inversify-props'

import { User } from '../models'

import { Repository } from './abstract.repository'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IAuthRepository<T> {
  getUser (): Promise<T>
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@injectable()
export class AuthRepository extends Repository<User> implements IAuthRepository<User> {
  protected mappingStructure = {}

  /**
   * @inheritDoc
   */
  public getUser (): Promise<User> {
    const user = {
      name: 'John',
      lastName: 'Doe'
    }

    return this.compose(user)
  }
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const AuthRepositoryType = Symbol.for('AuthRepository')