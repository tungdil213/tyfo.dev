import { inject } from '@adonisjs/core'
import Circle from '#models/circle'
import { CircleRepositoryContract } from '#repositories/contracts/circle_repository_contract'
import { CircleServiceContract } from '#services/contracts/circle_service_contract'

@inject()
export default class CircleService implements CircleServiceContract {
  constructor(private circleRepository: CircleRepositoryContract) {}
  async addUserToCircle(circleUuid: string, userUuid: string): Promise<void> {
    const circle = await this.circleRepository.findByUuid(circleUuid)
  }
  async removeUserFromCircle(circleUuid: string, userUuid: string): Promise<void> {
    const circle = await this.circleRepository.findByUuid(circleUuid)
  }
  async listCirclesByUser(userUuid: string): Promise<Circle[]> {
    return await this.circleRepository.listByUser(userUuid)
  }
  async listCirclesByRole(roleUuid: string): Promise<Circle[]> {
    return await this.circleRepository.listByRole(roleUuid)
  }
  async listCirclesByUserAndRole(userUuid: string, roleUuid: string): Promise<Circle[]> {
    return await this.circleRepository.listByUserAndRole(userUuid, roleUuid)
  }
  async listCirclesByCircleAndUser(circleUuid: string, userUuid: string): Promise<Circle[]> {
    return await this.circleRepository.listByCircleAndUser(circleUuid, userUuid)
  }
  async listCirclesByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Circle[]> {
    return await this.circleRepository.listByCircleAndRole(circleUuid, roleUuid)
  }
  async listCirclesByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userUuid: string
  ): Promise<Circle[]> {
    return await this.circleRepository.listByCircleAndRoleAndUser(circleUuid, roleUuid, userUuid)
  }

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
