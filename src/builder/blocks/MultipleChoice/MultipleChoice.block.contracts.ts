import { Quiz } from '@/builder'
import { QuizType } from '@/builder/defaults'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface MultipleChoiceQuizData {
  question: string
  variants: string[]
  answer: string
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type MultipleChoiceQuiz = Quiz<MultipleChoiceQuizData, QuizType.MultipleChoice>
