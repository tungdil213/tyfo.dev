import BaseException from '#exceptions/base_exception'

export default class AuthorizationException extends BaseException {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'E_AUTHORIZATION', 403, context)
  }
}
