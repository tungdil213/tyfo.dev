import { inject } from '@adonisjs/core'
import Folder from '#models/folder'
import { FolderRepositoryContract } from '#contracts/folder_repository_contract'

@inject()
export default class FolderService {
  constructor(private folderRepository: FolderRepositoryContract) {}

  public async createFolder(data: Partial<Folder>): Promise<Folder> {
    return await this.folderRepository.create(data)
  }

  public async getFolderByName(name: string): Promise<Folder | null> {
    return await this.folderRepository.findByName(name)
  }

  public async listFolders(): Promise<Folder[]> {
    return await this.folderRepository.list()
  }
}
