import ObjectModel from '#models/object'

export abstract class ObjectRepositoryContract {
  abstract create(data: Partial<ObjectModel>): Promise<ObjectModel>
  abstract findByUuid(uuid: string): Promise<ObjectModel | null>
  abstract findByHash(hash: string): Promise<ObjectModel | null>
  abstract findByFolderAndName(folderId: number, name: string): Promise<ObjectModel | null>
  abstract listByFolder(folderId: number, page?: number, limit?: number): Promise<ObjectModel[]>
  abstract listByUser(userId: number, page?: number, limit?: number): Promise<ObjectModel[]>
  abstract update(uuid: string, data: Partial<ObjectModel>): Promise<ObjectModel>
  abstract remove(uuid: string): Promise<void>
  abstract getRevision(folderId: number, name: string): Promise<number>
}
