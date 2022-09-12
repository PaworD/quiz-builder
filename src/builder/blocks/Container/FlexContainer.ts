import { Component, PropSync } from 'vue-property-decorator'

import { AbstractBlockForm } from '@/builder/_abstract'

import { FlexContainer } from './FlexContainer.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'FlexContainerForm',
  template: `
    <component :is="tag">
      This is tag: {{ tag }}
    </component>
  `
})
export class FlexContainerForm extends AbstractBlockForm<FlexContainer> {

  public get tag (): string {
    return this._formData.tag
  }
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