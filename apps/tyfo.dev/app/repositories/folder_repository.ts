import Folder from '#models/folder'
import { FolderRepositoryContract } from '#repositories/contracts/folder_repository_contract'
import Repository from './base/repository.js'

export default class FolderRepository
  extends Repository<Folder>
  implements FolderRepositoryContrac
{
  async listByCircleUuid(circleUuid: string): Promise<Folder[]> {
    return await Folder.query().where('circle_id', circleUuid)
  }
  async listByRole(roleUuid: string): Promise<Folder[]> {
    // Note: role_id n'existe pas dans le modèle actuel
    return await Folder.query().where('role_id', roleUuid)
  }
  async listByUser(userId: number): Promise<Folder[]> {
    return await Folder.query().where('user_id', userId)
  }
  async listByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Folder[]> {
    return await Folder.query().where('circle_id', circleUuid).where('role_id', roleUuid)
  }
  async listByRoleAndUser(roleUuid: string, userId: number): Promise<Folder[]> {
    return await Folder.query().where('role_id', roleUuid).where('user_id', userId)
  }
  async listByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Folder[]> {
    return await Folder.query()
      .where('circle_id', circleUuid)
      .where('role_id', roleUuid)
      .where('user_id', userId)
  }
  async listByCircleAndRoleAndUserAndObject(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string
  ): Promise<Folder[]> {
    return await Folder.query()
      .where('circle_id', circleUuid)
      .where('role_id', roleUuid)
      .where('user_id', userId)
      .where('object_id', objectUuid)
  }
  async listByCircleAndRoleAndUserAndObjectAndFolder(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string,
    folderUuid: string
  ): Promise<Folder[]> {
    return await Folder.query()
      .where('circle_id', circleUuid)
      .where('role_id', roleUuid)
      .where('user_id', userId)
      .where('object_id', objectUuid)
      .where('folder_id', folderUuid)
  }

  public async create(data: Partial<Folder>): Promise<Folder> {
    return await Folder.create(data)
  }

  public async findByUuid(folderUuid: string): Promise<Folder | null> {
    return await Folder.findBy('folder_uuid', folderUuid)
  }

  public async findByName(name: string): Promise<Folder | null> {
    return await Folder.findBy('name', name)
  }

  public async list(): Promise<Folder[]> {
    return await Folder.all()
  }

  /**
   * Implémentation de la méthode du contrat FolderRepositoryContrac
   * Trouve les dossiers d'un cercle par ID
   */
  public async findByCircle(circleId: number): Promise<Folder[]> {
    return await Folder.query().where('circle_id', circleId)
  }

  /**
   * Liste les dossiers d'un cercle par UUID
   * Cette méthode est maintenue pour la compatibilité avec les tests existants
   */
  public async listByCircle(circleUuid: string): Promise<Folder[]> {
    return await Folder.query().where('circle_id', circleUuid)
  }

  public async listByCircleAndUser(circleUuid: string, userId: number): Promise<Folder[]> {
    return await Folder.query().where('circle_id', circleUuid).where('user_id', userId)
  }

  /**
   * Trouve les dossiers enfants d'un dossier paren
   * @param parentId L'ID du dossier paren
   * @returns Une liste de dossiers enfants
   */
  public async findByParent(parentId: number): Promise<Folder[]> {
    return await Folder.query().where('parent_id', parentId)
  }

  /**
   * Trouve un dossier par son ID
   * @param id L'ID du dossier
   * @returns Le dossier trouvé ou null
   */
  public async findById(id: number): Promise<Folder | null> {
    return await Folder.find(id)
  }

  /**
   * Retourne le chemin complet d'un dossier, du dossier racine jusqu'au dossier spécifié
   * @param folderId L'ID du dossier
   * @returns Un tableau de dossiers formant le chemin
   */
  public async getPath(folderId: number): Promise<Folder[]> {
    const path: Folder[] = []
    let currentFolder = await this.findById(folderId)

    // Si le dossier n'existe pas, retourner un tableau vide
    if (!currentFolder) return path

    // Ajouter le dossier courant au chemin
    path.unshift(currentFolder)

    // Remonter l'arborescence en ajoutant chaque dossier parent au chemin
    while (currentFolder.parentId !== null) {
      currentFolder = await this.findById(currentFolder.parentId)
      if (!currentFolder) break
      path.unshift(currentFolder)
    }

    return path
  }

  /**
   * Met à jour un dossier existan
   * @param folderUuid L'UUID du dossier à mettre à jour
   * @param data Les données à mettre à jour
   * @returns Le dossier mis à jour
   */
  public async update(folderUuid: string, data: Partial<Folder>): Promise<Folder> {
    const folder = await this.findByUuid(folderUuid)
    if (!folder) {
      throw new Error(`Folder with UUID ${folderUuid} not found`)
    }

    await folder.merge(data).save()
    return folder
  }

  /**
   * Supprime un dossier existan
   * @param folderUuid L'UUID du dossier à supprimer
   */
  public async delete(folderUuid: string): Promise<void> {
    const folder = await this.findByUuid(folderUuid)
    if (!folder) return

    await folder.delete()
  }
}
