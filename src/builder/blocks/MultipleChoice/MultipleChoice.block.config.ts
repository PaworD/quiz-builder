import { ShelfItem } from '@/builder/BlockShelf'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const multipleChoiceBlockConfig = (): ShelfItem => ({
  icon: 'blank',
  type: 'multipleChoice',
  title: 'Multiple Choice',
  size: {
    cols: 6,
    rows: 50
  }
})