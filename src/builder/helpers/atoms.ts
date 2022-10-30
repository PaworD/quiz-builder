/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface AnyObject {
  [key: string] : any | unknown
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface WithContent<Content> {
  content: Content
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface WithType<Type> {
  type: Type
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface WithId {
  id: string
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface WithOrder {
  order: number
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface WithPoints {
  points: number
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface HasAnswer {
  /**
   * Determines the possible answer to given question statement.
   */
  answer: string
}