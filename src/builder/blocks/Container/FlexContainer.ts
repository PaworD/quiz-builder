import { Component, PropSync, Watch } from 'vue-property-decorator'

import { AbstractBlockForm } from '@/builder/_abstract'

import { FlexContainer } from './FlexContainer.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'FlexContainerForm',
  template: `
    <div>
    <div>
      <a-select v-model="_formData.tag" @change="onTagChange" placeholder="Select container tag"  label="Select container tag">
        <a-select-option value="div">Div</a-select-option>
        <a-select-option value="section">Section</a-select-option>
      </a-select>
    </div>
      
      <div>
        <input v-model="_formData.background" placeholder="Color" />
      </div>
    </div>
  `
})
export class FlexContainerForm extends AbstractBlockForm<FlexContainer> {
  /**
   * @override
   */
  protected createInitialContent (): FlexContainer['content'] {
    return {
      background: '#000',
      children: [],
      tag: 'section'
    }
  }

  public onTagChange (newValue: string): void {
    this._formData = {
      ...this._formData,
      tag: newValue
    }
  }

  @Watch('_formData', { deep: true })
  private onFormData (): void {
    console.log(this._formData)
  }
}
export default FlexContainerForm