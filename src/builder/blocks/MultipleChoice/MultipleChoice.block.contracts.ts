import { HasAnswer, Quiz } from '@/builder'
import { QuizType } from '@/builder/defaults'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export type MultipleChoiceAnswerType = string[]

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface MultipleChoiceQuizData extends HasAnswer<MultipleChoiceAnswerType> {
  /**
   * Determines the question statement.
   */
  question: string

  /**
   * Determines possible answer variants for given question
   */
  variants: string[]
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export type MultipleChoiceQuiz = Quiz<MultipleChoiceQuizData, QuizType.MultipleChoice>
