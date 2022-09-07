import { AnyObject, BlockSize, WithContent, WithId, WithOrder, WithSize, WithType } from '@/builder/helpers'

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

  /**
   * Determines the size of the module.
   */
  size: BlockSize
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
export type Quiz<Content, Type> = (
  WithContent<Content> &
  WithId &
  WithOrder &
  WithType<Type> &
  WithSize
)