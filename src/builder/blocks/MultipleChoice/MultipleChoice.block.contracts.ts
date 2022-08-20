import { Quiz } from '@/builder'
import { QuizType } from '@/builder/defaults'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface MultipleChoiceBlockData {
  question: string
  variants: string[]
  answer: string
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type MultipleChoiceBlock = Quiz<MultipleChoiceBlockData, QuizType.MultipleChoice>
