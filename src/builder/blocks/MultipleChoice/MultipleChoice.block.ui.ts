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
      <h3> {{ _content.question }} </h3>
      <div v-for="(variant, index) in _content.variants" :key="variant">
        <label :for="variant">
          <input type="checkbox" :name="variant" :value="index" v-model="reply" :id="variant">
          {{ variant }}
        </label>
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