import Circle from '#models/circle'
import { CircleRepositoryContract } from '#repositories/contracts/circle_repository_contract'
import { DateTime } from 'luxon'

export default class CircleRepository implements CircleRepositoryContract {
  public async create(data: Partial<Circle>): Promise<Circle> {
    return await Circle.create(data)
  }

  public async update(circleUuid: string, data: Partial<Circle>): Promise<Circle> {
    return await Circle.query()
      .where('uuid', circleUuid)
      .update({ ...data, updated_at: DateTime.now() })
      .firstOrFail()
  }

  public async delete(circleUuid: string): Promise<void> {
    await Circle.query().where('uuid', circleUuid).delete()
  }

  public async findByUuid(circleUuid: string): Promise<Circle | null> {
    return await Circle.findBy('uuid', circleUuid)
  }

  public async findByName(name: string): Promise<Circle | null> {
    return await Circle.findBy('name', name)
  }

  public async list(): Promise<Circle[]> {
    return await Circle.all()
  }

  public async listByUser(userId: number): Promise<Circle[]> {
    return await Circle.query().where('user_id', userId)
  }

  public async listByRole(roleUuid: string): Promise<Circle[]> {
    return await Circle.query().where('role_uuid', roleUuid)
  }

  public async listByUserAndRole(userId: number, roleUuid: string): Promise<Circle[]> {
    return await Circle.query().where('user_id', userId).where('role_uuid', roleUuid)
  }
}
