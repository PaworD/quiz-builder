import { IBlock } from '../builder'

/**
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
export enum QuizStatus {
  Published = 'published',
  Draft = 'draft'
}

/**
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
export interface QuizBlock {
  /**
   * Identifier
   */
  id?: string

  /**
   * Determines whether current quiz is active.
   */
  status: QuizStatus

  /**
   * Determines the duration for the test
   */
  duration: string

  /**
   * Determines the access password for the test (if not set - no password)
   */
  password: string

  /**
   * Determines the tag for the test (used to group certain test types)
   */
  tag: string

  /**
   * Determines the title of quiz.
   */
  title: string

  /**
   * Determines actual quiz blocks.
   */
  blocks: IBlock[]
}