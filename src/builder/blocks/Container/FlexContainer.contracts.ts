import { BuildContainer, PossibleContainer } from '@/builder/defaults/containers'

import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface FlexContainerData {
  /**
   * Determines the background color of container.
   */
  background: string

  /**
   * Determines child elements of container.
   */
  children: IBlock[]

  /**
   * Determines the tag of rendered element.
   */
  tag: string
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type FlexContainer = BuildContainer<FlexContainerData, PossibleContainer.Flex>
