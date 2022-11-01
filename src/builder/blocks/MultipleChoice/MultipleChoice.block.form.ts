import { Component } from 'vue-property-decorator'

import { AbstractBlockForm } from '../../_abstract/AbstractBlockForm'

import { MultipleChoiceQuiz } from '../MultipleChoice'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gamilc.com>
 */
@Component<MultipleChoiceBlockForm>({
  name: 'MultipleChoiceBlockForm',
  template: `
    <div>

    <h6 class="QHeading mb-1">Question</h6>
    <textarea class="QTextarea" v-model="_data.question" />

    <h6 class="QHeading mb-1 mt-1">Variants</h6>

    <div v-if="hasVariants" class="d-flex flex-column gap-1">
      <div v-for="(variant, index) in _data.variants" :key="index">
        <div class="d-flex justify-content-center align-items-center">
          <small class="ml-2">{{ index + 1 }}</small>
          <input class="QInput" type="text" v-model="_data.variants[index]" />
        </div>
      </div>
    </div>

    <div class="" v-else>
      
    </div>

    <div class="mt-1">
      <button class="QButton" @click="addVariant">Add Variant</button>
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
    const variants = [...this._data.variants]

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