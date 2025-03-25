import ObjectModel from '#models/object'

export abstract class ObjectModelRepositoryContract {
  abstract create(data: Partial<ObjectModel>): Promise<ObjectModel>
  abstract update(objectUuid: string, data: Partial<ObjectModel>): Promise<ObjectModel>
  abstract delete(objectUuid: string): Promise<void>
  abstract findByUuid(objectUuid: string): Promise<ObjectModel | null>
  abstract listByFolder(folderUuid: string): Promise<ObjectModel[]>
  abstract listByCircle(circleUuid: string): Promise<ObjectModel[]>
  abstract list(): Promise<ObjectModel[]>
}
