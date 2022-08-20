import { Component } from 'vue-property-decorator'

import { AbstractBlockForm } from '@/builder/_abstract/AbstractBlockForm'
import { MultipleChoiceBlock } from '@/builder/blocks/MultipleChoice/MultipleChoice.block.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<MultipleChoiceBlockForm>({
  name: 'MultipleChoiceBlockForm',
  template: `
    <div>
     <textarea v-model="_data.question" />
    
    <div>
      <span>Variants</span>
      <div v-if="hasVariants">
        <div v-for="(variant, index) in _data.variants">
          {{ index }}
          <input type="text" v-model="variant" />
        </div>
      </div>
      
      <div>
        <button @click="addVariant" >Add Variant</button>
      </div>
    </div>
    </div>
  `
})
export class MultipleChoiceBlockForm extends AbstractBlockForm<MultipleChoiceBlock> {
  public get hasVariants (): boolean {
    return Array.isArray(this._data.variants) && this._data.variants.length > 0
  }

  public addVariant (): void {
    const variants = [ ...this._data.variants ]

    variants.push('')

    this._data = {
      ...this._data,
      variants
    }
  }

  /**
   * @override
   */
  protected createInitialContent (): MultipleChoiceBlock['content'] {
    return {
      question: '',
      variants: [],
      answer: ''
    }
  }
}
export default MultipleChoiceBlockForm