import Circle from '#models/circle'
import { CircleRepositoryContract } from '#repositories/contracts/circle_repository_contract'
import Repository from './base/repository.js'
import Attribution from '#models/attribution'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class CircleRepository
  extends Repository<Circle>
  implements CircleRepositoryContract
{
  constructor() {
    super(Circle)
  }

  public async findByName(name: string): Promise<Circle | null> {
    return await Circle.findBy('name', name)
  }

  public async getCircleUsers(circleId: number): Promise<User[]> {
    const attributions = await Attribution.query().where('circle_id', circleId)

    if (attributions.length === 0) return []

    const userIds = attributions.map((attr) => attr.userId)
    return await User.query().whereIn('user_id', userIds)
  }

  public async getCircleAttributions(circleId: number): Promise<Attribution[]> {
    return await Attribution.query().where('circle_id', circleId)
  }

  public async archiveCircle(id: number): Promise<Circle> {
    const circle = await this.findById(id)
    if (!circle) throw new Error(`Circle with id ${id} not found`)

    circle.archivedAt = DateTime.now()
    await circle.save()

    return circle
  }

  public async restoreCircle(id: number): Promise<Circle> {
    const circle = await this.findById(id)
    if (!circle) throw new Error(`Circle with id ${id} not found`)

    circle.archivedAt = null
    await circle.save()

    return circle
  }
}
