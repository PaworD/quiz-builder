/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export abstract class Repository<T>  {
  // Defines the mapping configuration for incoming payload.
  protected mappingStructure = {}

  /**
   * Composes the payload with current mapping structure.
   */
  protected compose(payload: Record<string, unknown>): Promise<T> {
    return new Promise((resolve, reject) => {
      resolve(payload as T)
    })
  }
}
