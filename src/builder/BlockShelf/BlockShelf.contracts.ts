import { PossibleElements } from '@/builder/defaults'
import { BlockSize } from '@/builder'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface ShelfItem {
  /**
   * Icon that describes item.
   */
  icon?: string,

  /**
   * Type of the item.
   */
  type: string,

  /**
   * Title of the item.
   */
  title: string

  /**
   * Size of the block
   */
  size: BlockSize
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export type BlockShelfItemsRegistry = Record<PossibleElements, ShelfItem>