import Folder from '#models/folder'
import { FolderRepositoryContract } from '#contracts/folder_repository_contract'

export default class FolderRepository implements FolderRepositoryContract {
  public async create(data: Partial<Folder>): Promise<Folder> {
    return await Folder.create(data)
  }

  public async findByName(name: string): Promise<Folder | null> {
    return await Folder.findBy('name', name)
  }

  public async list(): Promise<Folder[]> {
    return await Folder.all()
  }
}
