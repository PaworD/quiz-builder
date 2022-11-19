import { injectable } from 'inversify-props'
import { getAuth } from 'firebase/auth'
import { setDoc, collection, doc, getDoc, getDocs, query, addDoc } from 'firebase/firestore'

import { Result } from '../models'
import { IResultsRepository } from '../contracts'

import { Repository } from './abstract.repository'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@injectable()
export class ResultsRepository extends Repository<Result> implements IResultsRepository<Result> {
  protected mappingStructure = {}

  private user = getAuth().currentUser

  /**
   * @inheritDoc
   */
  public async loadOne (id: string): Promise<Result[]> {
    const results: Result[] = []
    try {
      const candidateDocumentReference = collection(this.db, `results/${id}/collection`)

      const response = await getDocs(candidateDocumentReference)
      console.log(response)
      if (response) {
        response.forEach((data) => {
          results.push(data.data() as Result)
        })
      }

      return results
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @inheritDoc
   */
  public async save (id: string, payload: Result): Promise<void> {
    try {
      await addDoc(collection(this.db, `results`, id, 'collection'), {
        ...payload
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}
