<template>
  <div class="QuizTable-wrapper">
    <div class="QuizTable__heading">
      <h2> All Quizes </h2>
      <a-button @click="createQuiz">
        Create new +
      </a-button>
    </div>

    <div v-if="quizes && quizes.length > 0">
      <a-row>
        <a-col>
          <a-table :columns="columns" :data-source="quizList" :size="'middle'"
                   :loading="isLoading" bordered :pagination="false">
            <span slot="name" slot-scope="text, record">
              <router-link :to="'/quiz/builder/'+ record.id">
                {{ text }}
              </router-link>
            </span>

            <span slot="status" slot-scope="status">
              <a-tag :color="'green'" >
                {{ status }}
              </a-tag>
            </span>

            <span slot="tag" slot-scope="tag">
              <a-tag :color="'cyan'" >
                {{ tag.tag }}
              </a-tag>
            </span>

            <span slot="action" slot-scope="action, record">
              <a-row align="middle" justify="center" type="flex">
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <a-icon type="more" />
                  </a>
                  <a-menu slot="overlay" @click="(item) => onMenuItemClick(item, record.id)">
                    <a-menu-item key="1" style="color: mediumseagreen">
                      <a-icon type="copy" /> Copy link
                    </a-menu-item>
                    <a-menu-item key="4" style="color: darkkhaki">
                      <a-icon type="eye" /> Results
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a-icon type="edit" />Edit
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="3" style="color: red">
                      <a-icon type="delete" />Delete
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-row>
            </span>
          </a-table>
        </a-col>
      </a-row>
    </div>

    <a-empty v-else />

    <CreateQuizModal :visible.sync="isCreatingQuiz" @created="loadQuizes" />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { QuizBlock } from '../models'
import { quizTableColumns } from '../maps'

import { CreateQuizModal } from '../components/CreateQuizModal.vue'

import { IQuizRepository, QuizRepositoryType } from '../contracts'
import { VueConstructor } from 'vue'

@Component<QuizTable>({
  name: 'QuizTable',
  components: {
    CreateQuizModal
  },
  mounted (): void {
    this.loadQuizes()
  }
})
export class QuizTable extends Vue {
  @inject(QuizRepositoryType)
  protected readonly quizRepository!: IQuizRepository

  public quizes: QuizBlock[] = []
  public isLoading = false
  public isCreatingQuiz = false

  public readonly columns = quizTableColumns

  public createQuiz (): void {
    this.isCreatingQuiz = true
  }

  public get quizList () {
    if (!this.quizes.length) {
      return []
    }

    return this.quizes.map((quiz, index) => {
      return {
        id: quiz.id,
        key: index,
        name: quiz.title ?? '',
        tag: quiz.tag,
        status: quiz.status
      }
    })
  }

  public async loadQuizes (): Promise<void> {
    this.isLoading = true
    try {
      this.quizes = await this.quizRepository.load()
    } catch (e) {
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }

  public async deleteQuiz (id: string): Promise<void> {
    try {
      await this.quizRepository.delete(id)
      await this.loadQuizes()
    } catch (e) {
      console.log(e)
    }
  }

  public async onMenuItemClick (item: any, id: string): Promise<void> {
    if (item && typeof item === 'object' && ('key' in item)) {
      switch (item.key) {
        case '1':
          window.navigator.clipboard.writeText(`localhost:8080/#/quiz/viewer/${id}`)
          this.$message.info('Copied to clipboard')
          break
        case '3':
          await this.deleteQuiz(id)
          break
        case '4':
          this.$router.push({ name: 'quizresults', params: { id } })
          break
      }
    }
  }
}
export default QuizTable
</script>
