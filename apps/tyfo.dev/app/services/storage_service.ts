import drive from '@adonisjs/drive/services/main'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { StorageContract } from '#services/contracts/storage_contract'
import env from '#start/env'
import FileProcessingException from '#exceptions/file_processing_exception'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { inject } from '@adonisjs/core'
import ObjectRepository from '#repositories/object_repository'
import ObjectModel from '#models/object'
import { generateUuid } from '#utils/uuid_helper'

@inject()
export default class StorageService implements StorageContract {
  private storage
  private baseUrl = env.get('APP_URL')

  constructor(
    private objectRepository: ObjectRepository,
    disk = drive.use()
  ) {
    this.storage = disk
  }

  /**
   * Génère un hash unique pour le fichier
   */
  #generateFileHash(buffer: Buffer): string {
    return createHash('sha256').update(buffer).digest('hex')
  }

  /**
   * Méthode interne pour stocker un fichier
   */
  async #storeFile(buffer: Buffer, fileName: string, folder: string): Promise<string> {
    const filePath = `${folder}/${fileName}`

    if (!(await this.fileExists(filePath))) {
      await this.storage.put(filePath, buffer)
    }

    return filePath
  }

  /**
   * Upload un fichier (utilitaire)
   */
  async uploadFile(
    buffer: Buffer,
    originalName: string,
    folder: string = 'uploads'
  ): Promise<{ path: string; hash: string }> {
    try {
      const hash = this.#generateFileHash(buffer)
      const fileName = `${hash}_${originalName}`
      const path = await this.#storeFile(buffer, fileName, folder)

      return { path, hash }
    } catch (error) {
      console.error("Erreur lors de l'upload du fichier:", error)
      throw new Error('Impossible de téléverser le fichier.')
    }
  }

  /**
   * Traite et stocke un fichier uploadé
   */
  async processUploadedFile(
    file: MultipartFile,
    userId: number,
    folderId: number,
    name?: string
  ): Promise<ObjectModel> {
    this.#validateUploadedFile(file)

    try {
      const buffer = await readFile(file.tmpPath!)
      const { path, hash } = await this.uploadFile(buffer, name || file.clientName)
      const filename = name || file.clientName

      // Récupérer le numéro de révision
      const revision = await this.objectRepository.getRevision(folderId, filename)

      return await this.objectRepository.create({
        uuid: generateUuid(),
        userId,
        folderId,
        name: filename,
        mimeType: file.type || 'application/octet-stream',
        revision,
        hash,
        location: path,
      })
    } catch (error) {
      console.error('Erreur lors du traitement du fichier uploadé:', error)
      throw new FileProcessingException(
        'Une erreur est survenue lors du traitement du fichier uploadé.'
      )
    }
  }

  /**
   * Valide un fichier uploadé
   */
  #validateUploadedFile(file: MultipartFile): void {
    if (!file.isValid) {
      throw new FileProcessingException("Le fichier uploadé n'est pas valide.")
    }

    if (!file.tmpPath) {
      throw new FileProcessingException("Le fichier uploadé n'a pas de chemin temporaire.")
    }

    if (!file.clientName) {
      throw new FileProcessingException("Le fichier uploadé n'a pas de nom client.")
    }
  }

  /**
   * Vérifie si un fichier existe
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      return await this.storage.exists(filePath)
    } catch (error) {
      console.error("Erreur lors de la vérification de l'existence du fichier :", error)
      return false
    }
  }

  /**
   * Supprime un fichier
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      if (await this.fileExists(filePath)) {
        await this.storage.delete(filePath)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error)
      throw new Error('Impossible de supprimer le fichier.')
    }
  }

  /**
   * Récupère l'URL publique d'un fichier
   */
  async getFileUrl(filePath: string): Promise<string> {
    try {
      return typeof this.storage.getUrl === 'function'
        ? await this.storage.getUrl(filePath)
        : `${this.baseUrl}/uploads/${filePath}`
    } catch (error) {
      console.error("Erreur lors de la récupération de l'URL du fichier:", error)
      throw new Error("Impossible de récupérer l'URL du fichier.")
    }
  }
  /**
   * Génère une URL signée pour un fichier
   */
  async getSignedUrl(filePath: string, expirationInMinutes: number = 60): Promise<string> {
    try {
      if (typeof this.storage.getSignedUrl === 'function') {
        return await this.storage.getSignedUrl(filePath, {
          expiresIn: expirationInMinutes * 60,
        })
      }

      return `${this.baseUrl}/api/download/${filePath}` // À relier à un endpoint
    } catch (error) {
      console.error("Erreur lors de la génération de l'URL signée:", error)
      throw new Error('Impossible de générer une URL signée.')
    }
  }

  /**
   * Crée une nouvelle version d'un fichier existant
   */
  async createNewVersion(
    file: MultipartFile,
    objectUuid: string,
    userId: number
  ): Promise<ObjectModel> {
    this.#validateUploadedFile(file)

    try {
      // Récupérer l'objet existant
      const existingObject = await this.objectRepository.findByUuid(objectUuid)

      if (!existingObject) {
        throw new Error(`Fichier avec l'UUID ${objectUuid} non trouvé`)
      }

      // Lire le contenu du nouveau fichier
      const buffer = await readFile(file.tmpPath!)

      // Téléverser le nouveau fichier
      const { path, hash } = await this.uploadFile(buffer, file.clientName)

      // Récupérer le numéro de révision suivant
      const nextRevision = await this.objectRepository.getRevision(
        existingObject.folderId,
        existingObject.name
      )

      // Créer un nouvel objet avec la révision incrémentée
      return await this.objectRepository.create({
        uuid: generateUuid(),
        userId,
        folderId: existingObject.folderId,
        name: existingObject.name,
        mimeType: file.type || existingObject.mimeType,
        revision: nextRevision,
        hash,
        location: path,
      })
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle version du fichier:", error)
      throw new Error('Impossible de créer une nouvelle version du fichier.')
    }
  }

  /**
   * Récupère l'historique des versions d'un fichier
   */
  async getFileVersions(objectUuid: string): Promise<ObjectModel[]> {
    try {
      // Vérifier que l'objet existe
      const object = await this.objectRepository.findByUuid(objectUuid)
      if (!object) {
        throw new Error(`Fichier avec l'UUID ${objectUuid} non trouvé`)
      }

      // Utiliser la méthode listRevisions du repository pour récupérer toutes les versions
      // triées par numéro de révision (de la plus récente à la plus ancienne)
      return await (this.objectRepository as any).listRevisions(objectUuid)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique des versions:", error)
      throw new Error("Impossible de récupérer l'historique des versions.")
    }
  }

  /**
   * Restaure une version antérieure d'un fichier comme version actuelle
   */
  async restoreVersion(versionUuid: string, userId: number): Promise<ObjectModel> {
    try {
      // Récupérer la version à restaurer
      const versionToRestore = await this.objectRepository.findByUuid(versionUuid)
      if (!versionToRestore) {
        throw new Error(`Version avec l'UUID ${versionUuid} non trouvée`)
      }

      // Récupérer le numéro de révision suivant pour le fichier
      const nextRevision = await this.objectRepository.getRevision(
        versionToRestore.folderId,
        versionToRestore.name
      )

      // Créer une nouvelle version basée sur l'ancienne version
      return await this.objectRepository.create({
        uuid: generateUuid(),
        userId,
        folderId: versionToRestore.folderId,
        name: versionToRestore.name,
        mimeType: versionToRestore.mimeType,
        revision: nextRevision,
        hash: versionToRestore.hash,
        location: versionToRestore.location,
      })
    } catch (error) {
      console.error("Erreur lors de la restauration d'une version:", error)
      throw new Error('Impossible de restaurer la version du fichier.')
    }
  }

  /**
   * Met à jour les métadonnées d'un fichier sans créer de nouvelle version
   */
  async updateMetadata(
    objectUuid: string,
    updates: Partial<Pick<ObjectModel, 'name' | 'mimeType'>>
  ): Promise<ObjectModel> {
    try {
      // Vérifier que l'objet existe
      const existingObject = await this.objectRepository.findByUuid(objectUuid)
      if (!existingObject) {
        throw new Error(`Fichier avec l'UUID ${objectUuid} non trouvé`)
      }

      // Mettre à jour les métadonnées de l'objet en utilisant la méthode update du repository
      // qui prend l'UUID et les données à mettre à jour
      return await this.objectRepository.update(objectUuid, updates)
    } catch (error) {
      console.error('Erreur lors de la mise à jour des métadonnées du fichier:', error)
      throw new Error('Impossible de mettre à jour les métadonnées du fichier.')
    }
  }

  /**
   * Déplace un fichier d'un dossier à un autre
   */
  async moveFile(objectUuid: string, targetFolderId: number, userId: number): Promise<ObjectModel> {
    try {
      // Vérifier que l'objet existe
      const sourceObject = await this.objectRepository.findByUuid(objectUuid)
      if (!sourceObject) {
        throw new Error(`Fichier avec l'UUID ${objectUuid} non trouvé`)
      }

      // Vérifier que le dossier de destination est différent du dossier source
      if (sourceObject.folderId === targetFolderId) {
        // Si c'est le même dossier, retourner l'objet sans le modifier
        return sourceObject
      }

      // Vérifier s'il existe déjà un fichier avec le même nom dans le dossier cible
      const existingInTarget = await this.objectRepository.findByFolderAndName(
        targetFolderId,
        sourceObject.name
      )

      let revision = 1

      // Si un fichier avec le même nom existe déjà dans le dossier cible,
      // utiliser la révision suivante
      if (existingInTarget) {
        revision = existingInTarget.revision + 1
      }

      // Créer une nouvelle version du fichier dans le dossier cible
      // en conservant les mêmes propriétés sauf le folderId et en générant un nouveau UUID
      const movedObject = await this.objectRepository.create({
        uuid: generateUuid(),
        userId,
        folderId: targetFolderId,
        name: sourceObject.name,
        mimeType: sourceObject.mimeType,
        revision,
        hash: sourceObject.hash,
        location: sourceObject.location,
      })

      // Supprimer l'ancien objet
      await this.objectRepository.remove(objectUuid)

      return movedObject
    } catch (error) {
      console.error('Erreur lors du déplacement du fichier:', error)
      throw new Error('Impossible de déplacer le fichier.')
    }
  }

  /**
   * Recherche des fichiers par métadonnées
   */
  async searchByMetadata(
    criteria: Partial<Pick<ObjectModel, 'name' | 'mimeType'>>,
    folderId?: number,
    userId?: number
  ): Promise<ObjectModel[]> {
    try {
      // Récupérer tous les objets qui correspondent aux critères
      let objects = await this.objectRepository.list()

      // Filtrer par nom (recherche partielle)
      if (criteria.name !== undefined) {
        objects = objects.filter((obj: ObjectModel) => obj.name.includes(criteria.name!))
      }

      // Filtrer par type MIME (correspondance exacte)
      if (criteria.mimeType !== undefined) {
        objects = objects.filter((obj: ObjectModel) => obj.mimeType === criteria.mimeType)
      }

      // Filtrer par dossier si spécifié
      if (folderId !== undefined) {
        objects = objects.filter((obj: ObjectModel) => obj.folderId === folderId)
      }

      // Filtrer par utilisateur si spécifié
      if (userId !== undefined) {
        objects = objects.filter((obj: ObjectModel) => obj.userId === userId)
      }

      return objects
    } catch (error) {
      console.error('Erreur lors de la recherche de fichiers:', error)
      throw new Error('Impossible de rechercher les fichiers.')
    }
  }
}
