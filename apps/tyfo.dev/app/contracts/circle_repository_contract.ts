import Circle from '#models/circle'

export abstract class CircleRepositoryContract {
  abstract create(data: Partial<Circle>): Promise<Circle>
  abstract findByName(name: string): Promise<Circle | null>
  abstract list(): Promise<Circle[]>
}
