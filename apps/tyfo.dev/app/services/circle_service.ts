import { inject } from '@adonisjs/core'
import Circle from '#models/circle'
import { CircleRepositoryContract } from '#contracts/circle_repository_contract'

@inject()
export default class CircleService {
  constructor(private circleRepository: CircleRepositoryContract) {}

  public async createCircle(data: Partial<Circle>): Promise<Circle> {
    return await this.circleRepository.create(data)
  }

  public async getCircleByName(name: string): Promise<Circle | null> {
    return await this.circleRepository.findByName(name)
  }

  public async listCircles(): Promise<Circle[]> {
    return await this.circleRepository.list()
  }
}
