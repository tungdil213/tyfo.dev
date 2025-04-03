// repositories/object_repository.ts
import { inject } from '@adonisjs/core'
import { ObjectRepositoryContract } from '#repositories/contracts/object_model_repository_contract'
import ObjectModel from '#models/object'
import NotFoundException from '#exceptions/not_found_exception'

@inject()
export default class ObjectRepository implements ObjectRepositoryContract {
  /**
   * Create a new object
   */
  public async create(data: Partial<ObjectModel>): Promise<ObjectModel> {
    return await ObjectModel.create(data)
  }

  /**
   * Find an object by UUID
   */
  public async findByUuid(uuid: string): Promise<ObjectModel | null> {
    return await ObjectModel.query().where('uuid', uuid).first()
  }

  /**
   * Find an object by hash
   */
  public async findByHash(hash: string): Promise<ObjectModel | null> {
    return await ObjectModel.query().where('hash', hash).first()
  }

  /**
   * Find an object by folder and name
   */
  public async findByFolderAndName(folderId: number, name: string): Promise<ObjectModel | null> {
    return await ObjectModel.query()
      .where('folder_id', folderId)
      .where('name', name)
      .orderBy('revision', 'desc')
      .first()
  }

  /**
   * List objects in a folder
   */
  public async listByFolder(
    folderId: number,
    page?: number,
    limit?: number
  ): Promise<ObjectModel[]> {
    return await ObjectModel.query()
      .where('folder_id', folderId)
      .orderBy('name', 'asc')
      .orderBy('revision', 'desc')
  }

  /**
   * List objects owned by a user
   */
  public async listByUser(
    userId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<ObjectModel[]> {
    return await ObjectModel.query().where('user_id', userId).orderBy('updated_at', 'desc')
  }

  /**
   * Update an object
   */
  public async update(uuid: string, data: Partial<ObjectModel>): Promise<ObjectModel> {
    const object = await this.findByUuid(uuid)

    if (!object) {
      throw new NotFoundException('Objet non trouvé')
    }

    object.merge(data)
    await object.save()

    return object
  }

  /**
   * Remove an object
   */
  public async remove(uuid: string): Promise<void> {
    const object = await this.findByUuid(uuid)

    if (!object) {
      return
    }

    await object.delete()
  }

  /**
   * Get the next revision number for a file in a folder
   */
  public async getRevision(folderId: number, name: string): Promise<number> {
    const latestObject = await ObjectModel.query()
      .where('folder_id', folderId)
      .where('name', name)
      .orderBy('revision', 'desc')
      .first()

    return latestObject ? latestObject.revision + 1 : 1
  }
}
