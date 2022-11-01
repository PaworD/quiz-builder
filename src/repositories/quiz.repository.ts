import { injectable } from 'inversify-props'

import { IQuizRepository } from '../contracts'
import { QuizBlock } from '../models'

import { Repository } from './abstract.repository'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@injectable()
export class QuizRepository extends Repository<QuizBlock> implements IQuizRepository<QuizBlock> {
  protected mappingStructure = {}

  /**
   * @inheritDoc
   */
  public loadOne (qId: string): Promise<QuizBlock> {

    const quiz = [
      {
        id: 'one',
        type: 'multipleChoice',
        title: '1',
        order: 0,
        points: 2,
        content: {
          question: 'What do you call a computer on a network that requests files from another computer?',
          variants: ['computer', 'router', 'host'],
          answer: 'A'
        }
      }
    ]

    return this.toMap(quiz)
  }
}