import Folder from '#models/folder'

export abstract class FolderRepositoryContract {
  abstract create(data: Partial<Folder>): Promise<Folder>
  abstract findByName(name: string): Promise<Folder | null>
  abstract list(): Promise<Folder[]>
}
