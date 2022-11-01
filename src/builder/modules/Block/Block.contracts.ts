import { AnyObject, WithContent, WithId, WithOrder, WithPoints, WithType } from '@/builder/helpers'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
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
   * Determines block's type
   */
  type: string
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IBlock<Content extends AnyObject = AnyObject> extends BlockData {
  content: Content
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export type Quiz<Content, Type> = (
  WithContent<Content> &
  WithId &
  WithOrder &
  WithPoints &
  WithType<Type>
)