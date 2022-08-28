import { Component } from 'vue-property-decorator'

import { AbstractBlockUi } from '@/builder/_abstract'

import { ButtonQuiz } from './Button.block.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<ButtonBlockUi>({
  name: 'ButtonBlockUi',
  template: `
    <div>
      <button @click="_content.onClick">
        {{ _content.label }}
      </button>
    </div>
  `
})
export class ButtonBlockUi extends AbstractBlockUi<ButtonQuiz> {}
export default ButtonBlockUi