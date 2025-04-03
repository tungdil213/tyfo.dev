import Circle from '#models/circle'

export abstract class CircleRepositoryContract {
  abstract create(data: Partial<Circle>): Promise<Circle>
  abstract update(circleUuid: string, data: Partial<Circle>): Promise<Circle>
  abstract delete(circleUuid: string): Promise<void>
  abstract findByUuid(circleUuid: string): Promise<Circle | null>
  abstract findByName(name: string): Promise<Circle | null>
  abstract list(): Promise<Circle[]>
  abstract listByUser(userId: number): Promise<Circle[]>
  abstract listByRole(roleUuid: string): Promise<Circle[]>
  abstract listByUserAndRole(userId: number, roleUuid: string): Promise<Circle[]>
}
