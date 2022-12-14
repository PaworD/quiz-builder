import { VueConstructor } from 'vue'

import { MultipleChoiceBlockForm, MultipleChoiceBlockUi } from '@/builder/blocks'

import { BlockShelfItemsRegistry } from '@/builder/BlockShelf'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export enum QuizType {
  MultipleChoice = 'multipleChoice'
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const blocksFormRegistry: Record<QuizType, VueConstructor> = {
  [QuizType.MultipleChoice]: MultipleChoiceBlockForm
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const blocksUiRegistry: Record<QuizType, VueConstructor> = {
  [QuizType.MultipleChoice]: MultipleChoiceBlockUi
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const availableBlocks: BlockShelfItemsRegistry = {
  [QuizType.MultipleChoice]: {
    icon: 'blank',
    type: 'multipleChoice',
    title: 'Multiple Choice'
  }
}