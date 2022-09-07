import { VueConstructor } from 'vue'

import { MultipleChoiceBlockForm, MultipleChoiceBlockUi } from '@/builder/blocks'

import { BlockShelfItemsRegistry } from '@/builder/BlockShelf'
import { buttonElementConfig } from '@/builder/blocks/MultipleChoice/MultipleChoice.block.config'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export enum PossibleElements {
  Button = 'button'
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const blocksFormRegistry: Record<PossibleElements, VueConstructor> = {
  [PossibleElements.Button]: MultipleChoiceBlockForm
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const blocksUiRegistry: Record<PossibleElements, VueConstructor> = {
  [PossibleElements.Button]: MultipleChoiceBlockUi
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const availableElements: BlockShelfItemsRegistry = {
  [PossibleElements.Button]: buttonElementConfig()
}