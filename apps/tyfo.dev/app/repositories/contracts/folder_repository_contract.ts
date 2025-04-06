import Folder from '#models/folder'
import { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class FolderRepositoryContract extends BaseRepositoryContract<Folder> {
  abstract findByParent(parentId: number): Promise<Folder[]>
  abstract findByCircle(circleId: number): Promise<Folder[]>
  abstract getPath(folderId: number): Promise<Folder[]>
}
