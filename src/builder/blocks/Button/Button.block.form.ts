import { Component } from 'vue-property-decorator'

import { AbstractBlockForm } from '../../_abstract/AbstractBlockForm'

import { ButtonQuiz } from '@/builder/blocks/Button/Button.block.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<ButtonBlockForm>({
  name: 'ButtonBlockForm',
  template: `
    <div>
      <input type="text" class="QInput" placeholder="Label for button" v-model="_data.label">
    </div>
  `
})
export class ButtonBlockForm extends AbstractBlockForm<ButtonQuiz> {

  /**
   * @override
   */
  protected createInitialContent (): ButtonQuiz['content'] {
    return {
      label: 'Click Me',
      onClick: () => {
        alert('This is test click')
      }
    }
  }
}
export default ButtonBlockForm