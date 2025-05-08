import Circle from '#models/circle'

export interface CircleServiceContract {
  createCircle(data: Partial<Circle>): Promise<Circle>
  addUserToCircle(circleUuid: string, userUuid: string): Promise<void>
  removeUserFromCircle(circleUuid: string, userUuid: string): Promise<void>
  listCircles(): Promise<Circle[]>
  listCirclesByUser(userUuid: string): Promise<Circle[]>
  listCirclesByRole(roleUuid: string): Promise<Circle[]>
  listCirclesByUserAndRole(userUuid: string, roleUuid: string): Promise<Circle[]>
  listCirclesByCircleAndUser(circleUuid: string, userUuid: string): Promise<Circle[]>
  listCirclesByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Circle[]>
  listCirclesByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userUuid: string
  ): Promise<Circle[]>
}
