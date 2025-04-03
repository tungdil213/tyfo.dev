// app/exceptions/file_processing_exception.ts
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class FileProcessingException extends Exception {
  /**
   * Statut HTTP par défaut pour cette exception
   */
  static status = 500

  /**
   * Handler par défaut pour cette exception
   */
  async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(error.status || FileProcessingException.status).json({
      error: {
        message: error.message || 'Une erreur est survenue lors du traitement du fichier',
        code: 'E_FILE_PROCESSING',
      },
    })
  }
}
