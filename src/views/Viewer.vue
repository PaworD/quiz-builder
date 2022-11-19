<template>
  <div class="Viewer" v-if="quiz">
    <div class="timer-bar" />
    <div class="Viewer__renderer">
      <h2>{{ quiz.title }}</h2>
      <div class="CandidateBox">
        <div class="CandidateBox__input">
          <a-input v-model="candidateInfo.name"
                   placeholder="Candidate information (name, id, etc...)" />
          <small v-if="errors && this.errors['name'] && this.errors['name'].length">
            This field is required to proceed.
          </small>
        </div>
      </div>
    </div>

    <Renderer class="Viewer__renderer" :blocks="quiz.blocks" @onSubmit="onFormSubmitted" >
      <template #submit="{ submit }">
        <a-button type="primary" :loading="isPendingAnswer" @click="onSubmit(submit)">
          Submit
        </a-button>
      </template>
    </Renderer>

    <ViewerPasswordModal :visible.sync="shouldShowPasswordModal" :pass-key="quiz.password" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { IBlock, Renderer } from '../builder'
import { QuizBlock, ResultBlock } from '../models'

import {
  IQuizRepository,
  IResultsRepository,
  QuizRepositoryType,
  ResultsRepositoryType
} from '../contracts'
import { validationMap } from '../validations/viewer'
import { ViewerPasswordModal } from '../components/ViewerPasswordModal.vue'

@Component<Viewer>({
  name: 'Viewer',
  components: { Renderer, ViewerPasswordModal },
  mounted (): void {
    this.initQuiz()
  }
})
export class Viewer extends Vue {
  @inject(QuizRepositoryType)
  protected readonly quizRepository!: IQuizRepository

  @inject(ResultsRepositoryType)
  protected readonly resultsRepository!: IResultsRepository

  public errors: Record<string, string[]> = {}
  public quiz: QuizBlock | null = null
  public isLoading = false
  public isPendingAnswer = false
  public shouldShowPasswordModal = false

  // Validation object
  public readonly validatorsMap = validationMap

  /**
   * Form's payload
   */
  public candidateInfo = {
    name: ''
  }

  /**
   * Determines whether form has errors.
   */
  public get hasErrors (): boolean {
    return Object.keys(this.errors).length > 0
  }

  public get qId (): string {
    return this.$route.params.id as string
  }

  /**
   * Determines whehther form is valid to submit
   */
  public get isValid (): boolean {
    return Object.prototype.hasOwnProperty.call(this.candidateInfo, 'name') &&
      this.candidateInfo.name.length > 0
  }

  public async onFormSubmitted (replies: ResultBlock[]): Promise<void> {
    try {
      this.isPendingAnswer = true
      await this.resultsRepository.save(this.qId, {
        ownerId: this.qId,
        candidate: this.candidateInfo.name,
        blocks: replies
      })
    } catch (e) {
      this.$notification.error({
        message: 'An error occured while submitting answers!',
        description: ''
      })
    } finally {
      this.isPendingAnswer = false
    }
  }

  public async onSubmit (cb: CallableFunction): Promise<void> {
    this.clearErrors()

    Viewer.validate(
      this.validatorsMap,
      this.candidateInfo,
      this.setErrors
    )

    if (this.hasErrors) {
      return
    }

    await cb()
  }

  protected async initQuiz (): Promise<void> {
    await this.loadQuiz()
    this.checkIfPrivate()
  }

  /**
   * Flushes the errors object.
   */
  protected clearErrors (): void {
    this.errors = { }
  }

  /**
   * Sets the new object of errors
   */
  protected setErrors (errors: Record<string, string[]>): void {
    this.errors = errors
  }

  /**
   * Determines whether current quiz is protected.
   */
  private checkIfPrivate (): void {
    if (this.quiz && this.quiz.password && this.quiz.password.length > 0) {
      this.shouldShowPasswordModal = true
    }
  }

  /**
   * Handles the loading of the quiz.
   */
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

  /**
   * Validates the payload.
   *
   * @param rules - validation map object
   * @param setErrors - fn that sets the errors.
   * @param payload - payload to be validated
   */
  private static validate (
    rules: Record<string, (payload: any) => string | undefined>,
    payload: Record<string, any>,
    setErrors: CallableFunction
  ): void {
    for (const [key, value] of Object.entries(payload)) {
      if (key in rules) {
        const validity = rules[key](value)

        if (typeof validity !== 'undefined') {
          setErrors({
            [key]: validity
          })
        }
      }
    }
  }
}
export default Viewer
</script>
