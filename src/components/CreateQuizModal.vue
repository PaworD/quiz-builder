<template>
  <a-modal :visible="visible" title="New Quiz" @cancel="handleCancel" on-ok="handleOk">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        Return
      </a-button>
      <a-button key="submit" type="primary" :loading="isLoading" @click="createQuiz">
        Submit
      </a-button>
    </template>
    <a-row>
      <a-col :span="24">
        <label>Enter the title for the test</label>
        <a-input v-model="quiz.title" placeholder="Title" />
      </a-col>
    </a-row>

    <a-row :gutter="12">
      <a-col :span="12">
        <label>Setup duration of the test</label>
        <a-input v-model="quiz.duration" placeholder="Duration" />
      </a-col>

      <a-col :span="12">
        <label>Setup the password for the test</label>
        <a-input v-model="quiz.password" placeholder="Password" />
      </a-col>
    </a-row>

    <a-row :gutter="12">
      <a-col :span="12">
        <label>Setup the tag for the task (optional)</label>
        <a-input v-model="quiz.tag" placeholder="Tag" />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { IQuizRepository, QuizRepositoryType } from '../contracts'
import { QuizBlock, QuizStatus } from '@/models'

/**
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
@Component({ name: 'CreateQuizModal' })
export class CreateQuizModal extends Vue {
  @PropSync('visible', { type: Boolean, required: true })
  public _visible!: boolean

  @inject(QuizRepositoryType)
  protected readonly quizRepository!: IQuizRepository

  public isLoading = false
  public title = ''

  public quiz: QuizBlock = {
    blocks: [],
    duration: '',
    password: '',
    title: '',
    status: QuizStatus.Published,
    tag: ''
  }

  public async createQuiz (): Promise<void> {
    try {
      this.isLoading = true
      await this.quizRepository.create(this.quiz)
      this.$emit('created')
    } catch (e) {
      console.log(e)
    } finally {
      this._visible = false
      this.isLoading = false
    }
  }

  public handleCancel (): void {
    this._visible = false
  }
}

export default CreateQuizModal
</script>
