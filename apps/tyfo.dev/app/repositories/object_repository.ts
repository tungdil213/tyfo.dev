// repositories/object_repository.ts
import { inject } from '@adonisjs/core'
import { ObjectRepositoryContract } from '#repositories/contracts/object_model_repository_contract'
import ObjectModel from '#models/object'
import NotFoundException from '#exceptions/not_found_exception'
import Repository from './base/repository.js'

@inject()
export default class ObjectRepository
  extends Repository<ObjectModel>
  implements ObjectRepositoryContract
{
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
    let query = ObjectModel.query()
      .where('folder_id', folderId)
      .orderBy('name', 'asc')
      .orderBy('revision', 'desc')

    // Appliquer la pagination si spécifiée
    if (page !== undefined && limit !== undefined) {
      query = query.offset((page - 1) * limit).limit(limit)
    }
    return await query
  }

  /**
   * List objects owned by a user
   */
  public async listByUser(
    userId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<ObjectModel[]> {
    return await ObjectModel.query()
      .where('user_id', userId)
      .orderBy('updated_at', 'desc')
      .offset((page - 1) * limit)
      .limit(limit)
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

  /**
   * List all revisions of a file by its UUID
   */
  public async listRevisions(objectUuid: string): Promise<ObjectModel[]> {
    // Trouver l'objet de base
    const object = await this.findByUuid(objectUuid)

    if (!object) {
      return []
    }

    // Récupérer toutes les versions du même fichier (même nom et dossier)
    return await ObjectModel.query()
      .where('folder_id', object.folderId)
      .where('name', object.name)
      .orderBy('revision', 'desc')
  }

  /**
   * Implement getRevisions from contract (uses object ID instead of UUID)
   */
  public async getRevisions(objectId: number): Promise<ObjectModel[]> {
    // Trouver l'objet de base par son ID
    const object = await ObjectModel.find(objectId)

    if (!object) {
      return []
    }

    // Récupérer toutes les versions du même fichier
    return await ObjectModel.query()
      .where('folder_id', object.folderId)
      .where('name', object.name)
      .orderBy('revision', 'desc')
  }

  /**
   * List all objects
   */
  public async list(): Promise<ObjectModel[]> {
    return await ObjectModel.query().orderBy('updated_at', 'desc')
  }

  /**
   * Find objects by folder (implements contract method)
   */
  public async findByFolder(folderId: number): Promise<ObjectModel[]> {
    return await ObjectModel.query().where('folder_id', folderId).orderBy('name', 'asc')
  }

  /**
   * Find objects by mime type (implements contract method)
   */
  public async findByMimeType(mimeType: string): Promise<ObjectModel[]> {
    return await ObjectModel.query().where('mime_type', mimeType).orderBy('name', 'asc')
  }

  /**
   * Create a revision of an existing object (implements contract method)
   */
  public async createRevision(objectId: number, data: Partial<ObjectModel>): Promise<ObjectModel> {
    // Trouver l'objet de base
    const object = await ObjectModel.find(objectId)

    if (!object) {
      throw new NotFoundException('Objet non trouvé')
    }

    // Créer une nouvelle version en utilisant les données existantes et les nouvelles données
    const newRevision = await this.getRevision(object.folderId, object.name)

    return await this.create({
      ...object.toJSON(),
      ...data,
      id: undefined, // Ne pas copier l'ID pour créer un nouvel enregistrement
      revision: newRevision,
    })
  }
}
