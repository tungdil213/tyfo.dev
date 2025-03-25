import Circle from '#models/circle'
import { CircleRepositoryContract } from '#contracts/circle_repository_contract'

export default class CircleRepository implements CircleRepositoryContract {
  public async create(data: Partial<Circle>): Promise<Circle> {
    return await Circle.create(data)
  }

  public async findByName(name: string): Promise<Circle | null> {
    return await Circle.findBy('name', name)
  }

  public async list(): Promise<Circle[]> {
    return await Circle.all()
  }
}
