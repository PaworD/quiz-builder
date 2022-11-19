<template>
  <div class="ResultsTable-wrapper">
    <div class="ResultsTable__heading">
      <a-button icon="arrow-left" theme="warning" @click="goBack"></a-button>
      <h2> Results </h2>
    </div>
    <div v-if="results">
      <a-row>
        <a-col>
          <a-table :columns="columns" :data-source="results" :size="'middle'"
                   :loading="isLoading" bordered :pagination="false">
            <div slot="expandedRowRender" slot-scope="record">
                <a-row v-for="(block, index) in record.blocks" :key="index">
                  <a-col>
                    {{ block.qOrder }} : <a-icon
                    :type="isAnswer(block.type, block.answer,block.reply) ? 'check' : 'exclamation'"
                    :style="{color: isAnswer(block.type, block.answer, block.reply) ? 'green' : 'red'}" />
                  </a-col>
                </a-row>
            </div>
          </a-table>
        </a-col>
      </a-row>
    </div>

    <a-empty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { isAnswer } from '@/builder'

import { IResultsRepository, ResultsRepositoryType } from '../contracts'
import { Result } from '../models'
import { resultsTableColumns } from '../maps'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<QuizResultsTable>({
  name: 'QuizResultsTable',
  mounted (): void {
    this.loadQuizResults()
  }
})
export class QuizResultsTable extends Vue {
  @inject(ResultsRepositoryType)
  protected readonly resultsRepository!: IResultsRepository

  public readonly columns = resultsTableColumns
  public isAnswer = isAnswer

  public isLoading = false
  public results: Result[] | null = null

  /**
   * Determines the quiz id.
   */
  public get id (): string {
    return this.$route.params.id
  }

  /**
   * Handles the router action to previous page.
   */
  public goBack (): void {
    this.$router.go(-1)
  }

  /**
   * Handles loading of results for current quiz.
   */
  public async loadQuizResults (): Promise<void> {
    try {
      this.isLoading = true
      const response = await this.resultsRepository.loadOne(this.id)

      if (response) {
        this.results = response
      }
    } catch (e) {
      this.$notification.error({
        message: 'Error occured while fetching results for current quiz',
        description: ''
      })
    } finally {
      this.isLoading = false
    }
  }
}
export default QuizResultsTable
</script>