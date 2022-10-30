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
      <p> {{ _content.question }} </p>
      <div v-for="variant in _content.variants" :key="variant">
        <input type="checkbox" :name="variant">
        <label :for="variant">{{ variant }}</label>
      </div>
    </div>
  `
})
export class MultipleChoiceBlockUi extends AbstractBlockUi<MultipleChoiceQuiz> {}
export default MultipleChoiceBlockUi