/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
import { AnyObject, WithContent, WithId, WithOrder, WithPoints, WithVersion } from '@/builder/helpers'
import { QuizType } from '@/builder/defaults'

export interface BlockData {
  /**
   * Icon to be displayed in pole.
   */
  icon?: string

  /**
   * Unique identifier for individual block
   */
  id: string

  /**
   * Determines the order within grid in pole.
   */
  order: number

  /**
   * Determines the point of the quiz.
   */
  points: number

  /**
   * Determines whether current block is selected.
   */
  selected?: boolean

  /**
   * Title to be displayed in block in pole.
   */
  title?: string

  /**
   * Determines block's version
   */
  version: string
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface IBlock<Content extends AnyObject = AnyObject> extends BlockData {
  content: Content
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type Quiz<Content, Version> = (
  WithContent<Content> &
  WithId &
  WithOrder &
  WithPoints &
  WithVersion<Version>
)