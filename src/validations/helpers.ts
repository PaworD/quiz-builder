/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const validateString = (value: string, rule: string): string | undefined => {
  return rulesFn[rule](value)
}


/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const rulesFn: Record<string, CallableFunction> = {
  required: (value: string) => value.length ? undefined : 'This field is required'
}