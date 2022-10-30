import { VueConstructor } from 'vue'

import { MultipleChoiceBlockForm, MultipleChoiceBlockUi } from '@/builder/blocks'

import { BlockShelfItemsRegistry } from '@/builder/BlockShelf'
import { ButtonBlockUi, ButtonBlockForm } from '@/builder/blocks/Button'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export enum QuizType {
  MultipleChoice = 'multipleChoice',
  Button = 'button'
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const blocksFormRegistry: Record<QuizType, VueConstructor> = {
  [QuizType.MultipleChoice]: MultipleChoiceBlockForm,
  [QuizType.Button]: ButtonBlockForm
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const blocksUiRegistry: Record<QuizType, VueConstructor> = {
  [QuizType.MultipleChoice]: MultipleChoiceBlockUi,
  [QuizType.Button]: ButtonBlockUi
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const availableBlocks: BlockShelfItemsRegistry = {
  [QuizType.MultipleChoice]: {
    icon: 'blank',
    type: 'multipleChoice',
    title: 'Multiple Choice'
  },
  [QuizType.Button]: {
    icon: 'blank',
    type: 'button',
    title: 'Button'
  }
}