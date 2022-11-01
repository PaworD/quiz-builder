/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export abstract class Repository<T>  {
  // Defines the mapping configuration for incoming payload.
  protected mappingStructure = {}

  /**
   * Composes the payload with current mapping structure.
   */
  protected toMap(payload: Record<string, unknown>): Promise<T> {
    return new Promise((resolve, reject) => {
      let mapped = payload

      mapped = Object.entries(this.mappingStructure).reduce((acc, [mKey, oKey], index) => {
        return {
          ...acc,
          [mKey]: payload[oKey as unknown as string]
        }
      }, {})

      resolve(mapped as T)
    })
  }
}
