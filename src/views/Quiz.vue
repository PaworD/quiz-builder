<template>
  <QuizBuilder :blocks="">
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { IBlock } from '../builder'
import { QuizBuilder } from '../builder/QuizBuilder'

import { QuizBlock } from '../models'

import { IQuizRepository, QuizRepositoryType } from '../contracts'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<QuizView>({
  name: 'Quiz',
  components: { QuizBuilder },
  mounted (): void {
    this.loadQuiz()
  }
})
export class QuizView extends Vue {
  @inject(QuizRepositoryType)
  protected readonly quizRepository!: IQuizRepository

  public quiz: QuizBlock | null = null

  public get qId (): string {
    return '1'
  }

  /**
   * Load the quiz by id.
   */
  public async loadQuiz (): Promise<void> {
    try {
      this.quiz = await this.quizRepository.loadOne(this.qId)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Handles the save event of quiz builder.
   */
  public onSave(blocks: IBlock[]): void {
    console.log(blocks)
  }
}
export default QuizView
</script>
