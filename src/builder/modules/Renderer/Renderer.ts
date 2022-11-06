import { VueConstructor } from 'vue'
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { blocksUiRegistry, QuizType } from '@/builder/defaults'
import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'Renderer',
  template: `
    <div class="Renderer">
    <form @submit.prevent="submit">
      <div :class="[listClassName]">
        <component v-for="block in _blocks" :is="component(block.type)" :content.sync="block.content"
                   :type="block.type" :key="block.id" @reply="onReply" :identifier="block.id" />
      </div>
      <slot name="submit" v-bind="{ submit }" />
    </form>
    </div>
  `
})
export class Renderer extends Vue {
  /**
   * Registry of the UI components.
   */
  @Prop({ type: Object, required: false, default: () => blocksUiRegistry })
  private readonly uiRegistry!: Record<QuizType, VueConstructor>

  @Prop({ type: String, required: false, default: '' })
  public readonly listClassName?: string

  @PropSync('blocks', { type: Array, required: true })
  public _blocks!: IBlock[]

  protected replies: any[] = []

  /**
   * Determines the applicable component to quiz's type.
   * @param type - type of the quiz.
   */
  public component (type: string): VueConstructor {
    return this.uiRegistry[type as QuizType]
  }

  /**
   * Handles reply event of `Blocks`
   *
   * @param reply - reply from quiz
   */
  public onReply (reply: any): void {
    if (this.shouldReplace(reply)) {
      const oldReplyIndex = this.replies.findIndex((r) => r.qId === reply.qId)
      this.replies.splice(oldReplyIndex, 1, reply)
      return
    }

    this.replies.push(reply)
  }

  public async submit (): Promise<void> {
    this.$emit('onSubmit', this.replies)
  }

  /**
   * Determines whether reply exists inside the replies array.
   */
  protected shouldReplace (reply: any): boolean {
    return this.replies.some((existingReply) => {
      return existingReply.qId === reply.qId
    })
  }
}
export default Renderer