<template>
  <div style="height: 100%">
    <QuizBuilder v-if="quiz" :blocks="quiz.blocks" @onSave="onSave" />
    <QuizPropertiesModal :visible.sync="isOpen" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { IBlock } from '../builder'
import { QuizBuilder } from '../builder/QuizBuilder'

import { QuizBlock } from '../models'
import { QuizPropertiesModal } from '../components/QuizPropertiesModal.vue'

import { IQuizRepository, QuizRepositoryType } from '../contracts'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<QuizView>({
  name: 'Quiz',
  components: { QuizBuilder, QuizPropertiesModal },
  mounted (): void {
    this.loadQuiz()
  }
})
export class QuizView extends Vue {
  @inject(QuizRepositoryType)
  protected readonly quizRepository!: IQuizRepository

  public isOpen = false
  public isLoading = false
  public quiz: QuizBlock | null = null

  public get qId (): string {
    return this.$route.params.id as string
  }

  /**
   * Load the quiz by id.
   */
  public async loadQuiz (): Promise<void> {
    this.isLoading = true
    try {
      this.quiz = await this.quizRepository.loadOne(this.qId)
    } catch (e) {
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Handles the save event of quiz builder.
   */
  public async onSave(blocks: IBlock[]): Promise<void> {
    try {
      await this.quizRepository.update(this.qId,{
        blocks
      })
      this.$message.success('Saved!')
    } catch (e) {
      this.$message.error('Can not save the quiz, please check the content and try again later!')
    }
  }
}
export default QuizView
</script>
