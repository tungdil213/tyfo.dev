import { HttpContext } from '@adonisjs/core/http'

export default class EnsureSelfOrRoleMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>, roles: string[]) {
    const user = ctx.auth.user
    const userUuid = ctx.params.uuid

    if (!user) {
      return ctx.response.unauthorized({ message: 'Utilisateur non authentifié' })
    }

    await user.load('attributions', (query) => {
      query.preload('role')
    })

    const userRoles = user.attributions.map((attribution) => attribution.role.name)

    if (user.uuid === userUuid || roles.some((role) => userRoles.includes(role))) {
      return await next()
    }

    return ctx.response.unauthorized({ message: 'Accès refusé : permission insuffisante' })
  }
}
