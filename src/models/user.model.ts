/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export class User {
  private name: string
  private lastName: string

  constructor (name: string, lastName: string) {
    this.name = name
    this.lastName = lastName
  }

  public get fullName (): string {
    return this.name
  }
}