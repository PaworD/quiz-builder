/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface AnyObject {
  [key: string] : any | unknown
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface WithContent<Content> {
  content: Content
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface WithType<Type> {
  type: Type
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface WithId {
  id: string
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface WithOrder {
  order: number
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface WithPoints {
  points: number
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface HasAnswer<T> {
  /**
   * Determines the possible answer to given question statement.
   */
  answer: T
}