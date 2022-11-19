import { validateString } from '@/validations/helpers'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const validationMap = {
  name: (value: string) => validateString(value, 'required')
}
