import { HasAnswer, Quiz } from '@/builder'
import { QuizType } from '@/builder/defaults'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface MultipleChoiceQuizData extends HasAnswer{
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
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type MultipleChoiceQuiz = Quiz<MultipleChoiceQuizData, QuizType.MultipleChoice>
