import { VueConstructor } from 'vue'

import { WithContent, WithId, WithOrder, WithSize, WithType } from '@/builder'
import { FlexContainerForm } from '@/builder/blocks/Container'
import { BlockShelfItemsRegistry, ShelfItem } from '@/builder/BlockShelf'
import { flexContainerConfig } from '@/builder/blocks/Container/FlexContainer.config'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export enum PossibleContainer {
  Flex = 'flex'
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const containersRegistry: ContainersRegistry = {
  [PossibleContainer.Flex]: FlexContainerForm
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type ContainersRegistry = Record<PossibleContainer, VueConstructor>

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type BuildContainer<
  ContainerData,
  Container extends PossibleContainer
  > = (
    WithContent<ContainerData> &
    WithId &
    WithOrder &
    WithType<Container> &
    WithSize
  )

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export const availbaleContainers: BlockShelfItemsRegistry<PossibleContainer> = {
  [PossibleContainer.Flex]: flexContainerConfig()
}