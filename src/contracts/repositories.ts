import { User } from 'firebase/auth'

import { QuizBlock } from '../models'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IAuthRepository<T> {
  authorize (): Promise<boolean>
  login (email: string, password: string): Promise<void>
  signup (email: string, password: string): Promise<void>
  user: User | null
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const AuthRepositoryType = Symbol.for('AuthRepository')

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IQuizRepository<T extends QuizBlock = QuizBlock> {
  /**
   * Creates new quiz.
   */
  create (payload: QuizBlock): Promise<boolean>

  /**
   * Handles the deletion of passed in quiz
   */
  delete (id: string): Promise<boolean>

  /**
   * Loads the list of quizes.
   */
  load (): Promise<T[]>

  /**
   * Loads quiz by passed in id.
   */
  loadOne (qId: string): Promise<T | null>

  /**
   * Update the quiz by passed-in id and with new payload
   */
  update (id: string, payload: Partial<QuizBlock>): Promise<void>
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const QuizRepositoryType = Symbol.for('QuizRepository')
