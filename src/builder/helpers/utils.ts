import { QuizType } from '../defaults'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const isAnswer = (type: QuizType, answer: unknown, reply: unknown): boolean => {
  switch (type) {
    case QuizType.MultipleChoice:
      if (!Array.isArray(answer) || !Array.isArray(reply)) {
        return false
      }

      return reply.every((rep) => answer.includes(rep))
  }
}