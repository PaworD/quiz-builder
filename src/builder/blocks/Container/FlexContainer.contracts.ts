import { BuildContainer, PossibleContainer } from '@/builder/defaults/containers'

import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface FlexContainerData {
  /**
   * Determines the tag of rendered element.
   */
  tag: string

  /**
   * Determines possible answer variants for given question
   */
  children: IBlock[]
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type FlexContainer = BuildContainer<FlexContainerData, PossibleContainer.Flex>
