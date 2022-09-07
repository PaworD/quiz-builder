import { VueConstructor } from 'vue'

import { ButtonForm, ButtonUi } from '@/builder/blocks'

import { BlockShelfItemsRegistry } from '@/builder/BlockShelf'
import { buttonElementConfig } from '@/builder/blocks/Button/Button.config'

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
  [PossibleElements.Button]: ButtonForm
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const blocksUiRegistry: Record<PossibleElements, VueConstructor> = {
  [PossibleElements.Button]: ButtonUi
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const availableElements: BlockShelfItemsRegistry = {
  [PossibleElements.Button]: buttonElementConfig()
}
