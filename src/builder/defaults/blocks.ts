import { VueConstructor } from 'vue'

import { MultipleChoiceBlockForm, MultipleChoiceBlockUi } from '@/builder/blocks'

import { BlockShelfItemsRegistry } from '@/builder/BlockShelf'
import { multipleChoiceBlockConfig } from '@/builder/blocks/MultipleChoice/MultipleChoice.block.config'

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
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const availableBlocks: BlockShelfItemsRegistry = {
  [QuizType.MultipleChoice]: multipleChoiceBlockConfig()
}