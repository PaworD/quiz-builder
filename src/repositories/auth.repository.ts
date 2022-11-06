import { injectable } from 'inversify-props'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  User
} from 'firebase/auth'

import { userMappingStructure } from '../maps'
import { IAuthRepository } from '../contracts'

import { Repository } from './abstract.repository'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@injectable()
export class AuthRepository extends Repository<User> implements IAuthRepository<User> {
  protected mappingStructure = userMappingStructure
  private auth = getAuth()

  private _user: User | null = null

  public async authorize (): Promise<boolean> {
    return new Promise((resolve) => {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          this.saveUser(user)
          resolve(true)
        }

        resolve(false)
      })
    })
  }

  public async login (email: string, password: string): Promise<void> {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password)

      this.saveUser(user.user)
    } catch (e) {
      console.log(e)
    }
  }

  public async signup (email: string, password: string): Promise<void> {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password)

      this.saveUser(user.user)
    } catch (e) {
      throw new Error(e)
    }
  }

  private saveUser (user: User): void {
    this._user = user

    localStorage.setItem('token', JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      accessToken: user.accessToken,
      refreshToken: user.refreshToken
    }))
  }

  public get user (): User | null {
    return this._user ?? getAuth().currentUser
  }
}