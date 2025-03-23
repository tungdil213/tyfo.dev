import UserService from '#services/user_service'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  constructor(private userService: UserService) {}

  public async store({ request }: HttpContext) {
    const data = request.only(['email', 'password', 'role'])
    const user = await this.userService.createUser(data)
    return user
  }

  public async update({ params, request }: HttpContext) {
    const userId = params.id
    const data = request.only(['email', 'role'])
    const user = await this.userService.updateUser(userId, data)
    return user
  }

  public async archive({ params }: HttpContext) {
    const userId = params.id
    await this.userService.archiveUser(userId)
    return { message: 'User archived successfully' }
  }

  public async show({ params }: HttpContext) {
    const userUuid = params.uuid
    const user = await this.userService.getUserByUuid(userUuid)
    return user
  }

  public async index({ request }: HttpContext) {
    const filters = request.only(['role', 'isArchived'])
    const users = await this.userService.listUsers(filters)
    return users
  }
}
