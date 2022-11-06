<template>
  <div class="Viewer" v-if="quiz">
    <div class="timer-bar" />
    <div class="Viewer__renderer">
      <h2>{{ quiz.title }}</h2>
      <div class="CandidateBox">
        <div class="CandidateBox__input">
          <a-input v-model="candidateInfo.name"
                   placeholder="Candidate information (name, id, etc...)" />
        </div>
      </div>
    </div>

    <Renderer class="Viewer__renderer" :blocks="quiz.blocks" @onSubmit="onFormSubmitted" >
      <template #submit="{ submit }">
        <a-button type="primary" @click="submit">
          Submit
        </a-button>
      </template>
    </Renderer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { IBlock, Renderer } from '../builder'
import { QuizBlock } from '../models'

import { IQuizRepository, QuizRepositoryType } from '../contracts'

@Component<Viewer>({
  name: 'Viewer',
  components: { Renderer },
  mounted (): void {
    this.initQuiz()
  }
})
export class Viewer extends Vue {
  @inject(QuizRepositoryType)
  protected readonly quizRepository!: IQuizRepository

  public quiz: QuizBlock | null = null
  public isLoading = false
  public shouldShowPasswordModal = false

  public candidateInfo = {
    name: ''
  }

  public get qId (): string {
    return this.$route.params.id as string
  }

  public onFormSubmitted (replies: IBlock[]): void {
    console.log(replies)
  }

  protected async initQuiz (): Promise<void> {
    await this.loadQuiz()
    this.checkIfPrivate()
  }

  private checkIfPrivate (): void {
    if (this.quiz && this.quiz.password && this.quiz.password.length > 0) {
      this.shouldShowPasswordModal = true
    }
  }

  private async loadQuiz (): Promise<void> {
    this.isLoading = true
    try {
      this.quiz = await this.quizRepository.loadOne(this.qId)
    } catch (e) {
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }
}
export default Viewer
</script>
