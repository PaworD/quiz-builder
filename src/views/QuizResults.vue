<template>
  <div>
    <QuizResultsTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { QuizResultsTable } from '../components/QuizResultsTable.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({
  name: 'QuizResults',
  components: {
    QuizResultsTable
  }
})
export class QuizResults extends Vue {

}
export default QuizResults
</script>
