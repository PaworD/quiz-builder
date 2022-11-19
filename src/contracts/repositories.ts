import { QuizBlock, Result } from '../models'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IAuthRepository<T> {
  authorize (): Promise<boolean>
  login (email: string, password: string): Promise<void>
  signup (email: string, password: string): Promise<void>
  signOut (): Promise<void>
  user: T | null
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
  create (payload: T): Promise<boolean>

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
  update (id: string, payload: Partial<T>): Promise<void>
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const QuizRepositoryType = Symbol.for('QuizRepository')

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IResultsRepository<T extends Result = Result> {
  /**
   * Loads the results for passed in quiz.
   *
   * @param id - quiz id
   */
  loadOne(id: string): Promise<T[]>

  /**
   * Saves the new answer sheet
   *
   * @param id - quiz id
   * @param payload - answers
   */
  save(id: string, payload: T): Promise<void>
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const ResultsRepositoryType = Symbol.for('ResultRepository')