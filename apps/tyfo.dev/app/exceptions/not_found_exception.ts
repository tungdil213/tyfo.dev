import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class NotFoundException extends Exception {
  /**
   * Statut HTTP par défaut pour cette exception
   */
  static status = 404

  /**
   * Handler par défaut pour cette exception
   */
  async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(error.status || NotFoundException.status).json({
      error: {
        message: error.message || 'Une erreur est survenue lors du traitement du fichier',
        code: 'E_NOT_FOUND',
      },
    })
  }
}
