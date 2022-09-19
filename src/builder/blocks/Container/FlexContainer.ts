import { Component, PropSync } from 'vue-property-decorator'

import { AbstractBlockForm } from '@/builder/_abstract'

import { FlexContainer } from './FlexContainer.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'FlexContainerForm',
  template: `
    <div>
      <a-select v-model="_formData.tag" @change="onTagChange">
        <a-select-option value="div">Div</a-select-option>
        <a-select-option value="section">Section</a-select-option>
      </a-select>
    </div>
  `
})
export class FlexContainerForm extends AbstractBlockForm<FlexContainer> {
  /**
   * @override
   */
  protected createInitialContent (): FlexContainer['content'] {
    return {
      tag: 'section',
      children: []
    }
  }

  public onTagChange (newValue: string): void {
    this._formData = {
      ...this._formData,
      tag: newValue
    }
  }
}
export default FlexContainerForm