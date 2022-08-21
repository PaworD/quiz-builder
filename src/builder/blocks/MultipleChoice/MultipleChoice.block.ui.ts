import { Component } from 'vue-property-decorator'

import { AbstractBlockUi } from '@/builder/_abstract'

import { MultipleChoiceQuiz } from './MultipleChoice.block.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<MultipleChoiceBlockUi>({
  name: 'MultipleChoiceBlockUi',
  template: `
    <div>
      <p> {{ _data.question }} </p>
    
      <div v-for="variant in _data.variants" :key="variant">
        <label :for="variant">{{ variant }}</label>
        <input type="checkbox" :name="variant">
      </div>
    </div>
  `
})
export class MultipleChoiceBlockUi extends AbstractBlockUi<MultipleChoiceQuiz> {}
export default MultipleChoiceBlockUi