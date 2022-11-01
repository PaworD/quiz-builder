import { Component, Watch } from 'vue-property-decorator'

import { AbstractBlockUi } from '@/builder/_abstract'

import { MultipleChoiceQuiz } from './MultipleChoice.block.contracts'

/**
 * @author Javlon Khalimjonov <khlalimjanov2000@gmail.com>
 */
@Component<MultipleChoiceBlockUi>({
  name: 'MultipleChoiceBlockUi',
  template: `
    <div>
      <p> {{ _content.question }} </p>
      <div v-for="variant in _content.variants" :key="variant">
        <input type="checkbox" :name="variant" :value="variant" v-model="reply" required>
        <label :for="variant">{{ variant }}</label>
      </div>
    </div>
  `
})
export class MultipleChoiceBlockUi extends AbstractBlockUi<MultipleChoiceQuiz> {
  /**
   * @override
   */
  protected reply: string[] = []

  @Watch('reply')
  protected onReply (): void {
    this.acceptReply(this.reply)
  }
}
export default MultipleChoiceBlockUi