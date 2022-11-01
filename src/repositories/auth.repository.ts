import { injectable } from 'inversify-props'

import { User } from '../models'

import { userMappingStructure } from '../maps'
import { IAuthRepository } from '../contracts'

import { Repository } from './abstract.repository'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@injectable()
export class AuthRepository extends Repository<User> implements IAuthRepository<User> {
  protected mappingStructure = userMappingStructure

  /**
   * @inheritDoc
   */
  public getUser (): Promise<User> {
    const user = {
      name: 'John',
      last_name: 'Doe'
    }

    return this.toMap(user)
  }
}