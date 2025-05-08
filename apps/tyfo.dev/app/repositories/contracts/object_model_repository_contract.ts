import ObjectModel from '#models/object'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class ObjectRepositoryContract extends BaseRepositoryContract<ObjectModel> {
  abstract findByFolder(folderId: number): Promise<ObjectModel[]>
  abstract findByHash(hash: string): Promise<ObjectModel[]>
  abstract findByMimeType(mimeType: string): Promise<ObjectModel[]>
  abstract createRevision(objectId: number, data: Partial<ObjectModel>): Promise<ObjectModel>
  abstract getRevisions(objectId: number): Promise<ObjectModel[]>
}
