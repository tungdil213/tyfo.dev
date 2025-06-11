import { inject } from '@adonisjs/core'
import Folder from '#models/folder'
import { FolderRepositoryContract } from '#repositories/contracts/folder_repository_contract'
import { FolderServiceContract } from '#services/contracts/folder_service_contract'
import { generateUuid } from '#utils/uuid_helper'
import { DateTime } from 'luxon'

@inject()
export default class FolderService implements FolderServiceContract {
  constructor(private folderRepository: FolderRepositoryContract) {}
  
  public async updateFolder(folderUuid: string, data: Partial<Folder>): Promise<Folder> {
    var current = await this.folderRepository.findByUuid(folderUuid);
    if (!current) {
      throw new Error(`Folder with UUID ${folderUuid} not found`);
    }
    
    var folder = {
      uuid: current?.uuid,
      name: data.name,
      description: data.description,
      circleUuid: data.circleId,
      userUuid: data.userId,
      createdAt: current?.createdAt,
      updatedAt: DateTime.now(),
    }
    return await this.folderRepository.update(folderUuid, folder);
  }

  deleteFolder(folderUuid: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  listFoldersByUser(userUuid: string): Promise<Folder[]> {
    throw new Error('Method not implemented.')
  }

  listFoldersByCircle(circleUuid: string): Promise<Folder[]> {
    return this.folderRepository.listByCircleUuid(circleUuid);
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
    var folder = {
      uuid: generateUuid(),
      name: data.name,
      description: data.description,
      circleUuid: data.circleId,
      userUuid: data.userId,
      createdAt: DateTime.now(),
    }
    return await this.folderRepository.create(folder)
  }

  public async getFolderByName(name: string): Promise<Folder | null> {
    return await this.folderRepository.findByName(name)
  }

  public async listFolders(): Promise<Folder[]> {
    return await this.folderRepository.list()
  }
}
