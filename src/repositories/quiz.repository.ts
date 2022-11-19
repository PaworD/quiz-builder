import { injectable } from 'inversify-props'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import { IQuizRepository } from '../contracts'
import { QuizBlock } from '../models'

import { Repository } from './abstract.repository'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@injectable()
export class QuizRepository extends Repository<QuizBlock> implements IQuizRepository<QuizBlock> {
  protected mappingStructure = {}

  private user = getAuth().currentUser

  /**
   * @inheritDoc
   */
  public async create (payload: QuizBlock): Promise<boolean> {
    try {
     await addDoc(collection(this.db, `users/${this.user?.uid}/quizes`), {
       ...payload
     })

      return true
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @inheritDoc
   */
  public async delete (id: string): Promise<boolean> {
    const candidateDocumentReference = doc(this.db, `users/${this.user?.uid}/quizes/${id}`)
    try {
      const response = await deleteDoc(candidateDocumentReference)
      return true
    } catch (e) {
      throw new Error(e)
    }

  }

  /**
   * @inheritDoc
   */
  public async loadOne (qId: string): Promise<QuizBlock | null> {
    try {
      const candidateDocumentReference = doc(this.db, `users/${this.user?.uid}/quizes/${qId}`)
      const response = await getDoc(candidateDocumentReference)

      return response.data() as QuizBlock
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @inheritDoc
   */
  public async load (): Promise<QuizBlock[]> {
    const quizes: QuizBlock[] = []

    const _query = query(collection(this.db, `users/${this.user?.uid}/quizes`))

    try {
      const response = await getDocs(_query)

      response.forEach((doc) => {
        const result = doc.data()

        if (result) {
          quizes.push({
            ...doc.data() as QuizBlock,
            id: doc.id
          })
        }
      });

      return quizes
    } catch (e) {
      throw new Error('Error while fetching quizes')
    }
  }

  /**
   * @inheritDoc
   */
  public async update (id: string, payload: Partial<QuizBlock>): Promise<void> {
    try {
      const candidateDocumentReference = doc(this.db, `users/${this.user?.uid}/quizes/${id}`)
      const response = await updateDoc(candidateDocumentReference, payload)
    } catch (e) {
      throw new Error(e)
    }
  }
}