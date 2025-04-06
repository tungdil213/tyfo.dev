import BaseException from '#exceptions/base_exception'

export default class ValidationException extends BaseException {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'E_VALIDATION', 400, context)
  }
}
