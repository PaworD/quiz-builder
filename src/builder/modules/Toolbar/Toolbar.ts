import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { QuizBuilderMode } from '@/builder/QuizBuilder'
import { DiagramIcon, EyeIcon, SaveIcon } from '@/builder/shared/icons'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<Toolbar>({
  name: 'Toolbar',
  components: { EyeIcon, DiagramIcon, SaveIcon },
  template: `
    <div class="QToolbar">
      <!-- General Information -->
<!--      <div class="QToolbar__information">-->
<!--        <span class="QToolbar__information__info">-->
<!--          Q: {{ quizCount }}-->
<!--        </span>-->
<!--      </div>-->
      <!-- END | General Information -->
      
      <!-- Actions -->
      <div class="QToolbar__actions">
        <button class="QToolbar__actions__action"
                @click="triggerSave">
          <SaveIcon />
        </button>
        
        <button class="QToolbar__actions__action"
                :class="{ '--active': _activeMode === mode.View }"
                @click="changeMode(mode.View)">
          <EyeIcon />
        </button>

        <button class="QToolbar__actions__action"
                :class="{ '--active': _activeMode === mode.Edit }"
                @click="changeMode(mode.Edit)">
          <DiagramIcon />
        </button>
      </div>
      <!-- END | Actions -->
    </div>
  `
})
export class Toolbar extends Vue {
  @Prop({ type: Number, required: true })
  public readonly quizCount!: number

  @PropSync('activeMode', { type: Number, required: true })
  public _activeMode!: QuizBuilderMode

  public mode = QuizBuilderMode

  /**
   * Handles mode changing of QuizBuilder
   */
  public changeMode (mode: QuizBuilderMode): void {
    this._activeMode = mode
  }

  /**
   * Emits @onSave event.
   */
  public triggerSave (): void {
    this.$emit('onSave')
  }
}

export default Toolbar