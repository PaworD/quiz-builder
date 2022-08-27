import { Component } from 'vue-property-decorator'

import { AbstractBlockForm } from '../../_abstract/AbstractBlockForm'

import { MultipleChoiceQuiz } from '../MultipleChoice'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<MultipleChoiceBlockForm>({
  name: 'MultipleChoiceBlockForm',
  template: `
    <div>
     <textarea class="QTextarea" v-model="_data.question" />
    
    <div>
      <span>Variants</span>
      <div v-if="hasVariants">
        <div v-for="(variant, index) in _data.variants" :key="index">
          {{ index }}
          <input class="QInput" type="text" v-model="_data.variants[index]" />
        </div>
      </div>
      
      <div>
        <button @click="addVariant" >Add Variant</button>
      </div>
    </div>
    </div>
  `
})
export class MultipleChoiceBlockForm extends AbstractBlockForm<MultipleChoiceQuiz> {
  /**
   * Determines whether there are variants.
   */
  public get hasVariants (): boolean {
    return Array.isArray(this._data.variants) && this._data.variants.length > 0
  }

  /**
   * Handles adding new empty variant.
   */
  public addVariant (): void {
    const variants = [ ...this._data.variants ]

    variants.push('')

    this._data = {
      ...this._data,
      variants: [
        ...variants
      ]
    }
  }

  /**
   * @override
   */
  protected createInitialContent (): MultipleChoiceQuiz['content'] {
    return {
      question: '',
      variants: [],
      answer: ''
    }
  }
}
export default MultipleChoiceBlockForm