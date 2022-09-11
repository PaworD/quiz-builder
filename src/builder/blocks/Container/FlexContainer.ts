import { Component, PropSync } from 'vue-property-decorator'

import { AbstractBlockForm } from '@/builder/_abstract'

import { FlexContainer } from './FlexContainer.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'FlexContainerForm',
  template: `
    <component :is="_tag">
      This is tag: {{ _tag }}
    </component>
  `
})
export class FlexContainerForm extends AbstractBlockForm<FlexContainer> {
  @PropSync('tag', { type: String, required: false, default: 'div' })
  public _tag!: string

  /**
   * @override
   */
  protected createInitialContent (): FlexContainer['content'] {
    return {
      tag: 'section',
      children: []
    }
  }

  /**
   * @override
   */
  protected createInitialSize (): FlexContainer['size'] {
    return {
      cols: 12,
      rows: 0
    }
  }
}
export default FlexContainerForm