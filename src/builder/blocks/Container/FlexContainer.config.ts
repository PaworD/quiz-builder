/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
import { ShelfItem } from '@/builder/BlockShelf'

export const flexContainerConfig = (): ShelfItem => ({
  icon: 'blank',
  type: 'flex-container',
  title: 'Flex Container',
  size: {
    cols: 12,
    rows: 0
  }
})