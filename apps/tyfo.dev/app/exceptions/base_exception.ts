import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class BaseException extends Exception {
  constructor(
    message: string,
    public code: string = 'E_UNKNOWN_ERROR',
    public status: number = 500,
    public context?: Record<string, any>
  ) {
    super(message, { status })
  }

  /**
   * Gestion standard de l'exception
   */
  async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(error.status).json({
      error: {
        message: error.message,
        code: error.code,
      },
    })
  }

  /**
   * Assainit le contexte pour éviter de journaliser des données sensibles
   */
  private sanitizeContext(context: Record<string, any>): string {
    // Masquage des données sensibles
    const sanitized = { ...context }
    const sensitiveKeys = ['password', 'token', 'secret', 'apiKey']

    for (const key of Object.keys(sanitized)) {
      if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
        sanitized[key] = '[REDACTED]'
      }
    }

    return JSON.stringify(sanitized)
  }
}
