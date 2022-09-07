import { ShelfItem } from '@/builder/BlockShelf'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const buttonElementConfig = (): ShelfItem => ({
  icon: 'blank',
  type: 'button',
  title: 'Button',
  size: {
    cols: 6,
    rows: 12
  }
})