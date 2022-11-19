import { QuizBlock } from '@/models/quiz.model'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface Result {
  /**
   * Identifier
   */
  id?: string

  /**
   * Candidate Information as name, id, etc...
   */
  candidate: string

  /**
   * Quiz Id
   */
  ownerId: string

  /**
   * Quiz information
   */
  owner?: ResultOwner

  /**
   * Answer blocks.
   */
  blocks: ResultBlock[]
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface ResultBlock {
  question: string
  reply: unknown
  type: string
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export type ResultOwner = Omit<QuizBlock, 'status' | 'blocks' | 'password' | 'duration'>