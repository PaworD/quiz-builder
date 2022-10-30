import { QuizType } from '@/builder/defaults'

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
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export type BlockShelfItemsRegistry = Record<QuizType, ShelfItem>