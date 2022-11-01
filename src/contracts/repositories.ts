import { QuizBlock } from '../models'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IAuthRepository<T> {
  getUser (): Promise<T>
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const AuthRepositoryType = Symbol.for('AuthRepository')

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IQuizRepository<T extends QuizBlock = QuizBlock> {
  loadOne (qId: string): Promise<T>
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const QuizRepositoryType = Symbol.for('QuizRepository')
