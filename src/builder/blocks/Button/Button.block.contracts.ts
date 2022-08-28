import { Quiz } from '@/builder'
import { QuizType } from '@/builder/defaults'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface BlockQuizData {
  label: string,
  onClick: () => void
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type ButtonQuiz = Quiz<BlockQuizData, QuizType.Button>
