import BaseException from '#exceptions/base_exception'

export default class ResourceNotFoundException extends BaseException {
  constructor(resourceType: string, identifier: string | number, context?: Record<string, any>) {
    super(
      `La ressource ${resourceType} avec l'identifiant ${identifier} n'a pas été trouvée`,
      'E_RESOURCE_NOT_FOUND',
      404,
      { resourceType, identifier, ...context }
    )
  }
}
