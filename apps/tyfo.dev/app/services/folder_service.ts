import { inject } from '@adonisjs/core'
import Folder from '#models/folder'
import { FolderRepositoryContract } from '#repositories/contracts/folder_repository_contract'
import { FolderServiceContract } from '#services/contracts/folder_service_contract'

@inject()
export default class FolderService implements FolderServiceContract {
  constructor(private folderRepository: FolderRepositoryContract) {}
  updateFolder(folderUuid: string, data: Partial<Folder>): Promise<Folder> {
    throw new Error('Method not implemented.')
  }
  deleteFolder(folderUuid: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  listFoldersByUser(userUuid: string): Promise<Folder[]> {
    throw new Error('Method not implemented.')
  }
  listFoldersByCircle(circleUuid: string): Promise<Folder[]> {
    throw new Error('Method not implemented.')
  }
  listFoldersByUserAndCircle(userUuid: string, circleUuid: string): Promise<Folder[]> {
    throw new Error('Method not implemented.')
  }
  listFoldersByFolderAndUser(folderUuid: string, userUuid: string): Promise<Folder[]> {
    throw new Error('Method not implemented.')
  }
  listFoldersByFolderAndCircle(folderUuid: string, circleUuid: string): Promise<Folder[]> {
    throw new Error('Method not implemented.')
  }
  listFoldersByFolderAndUserAndCircle(
    folderUuid: string,
    userUuid: string,
    circleUuid: string
  ): Promise<Folder[]> {
    throw new Error('Method not implemented.')
  }

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
