import ObjectModel from '#models/object'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export abstract class StorageContract {
  abstract processUploadedFile(
    file: MultipartFile,
    userId: number,
    folderId: number,
    name?: string
  ): Promise<ObjectModel>
  /**
   * Upload un fichier et retourne son chemin et son hash
   */
  abstract uploadFile(
    buffer: Buffer,
    originalName: string,
    folder?: string
  ): Promise<{ path: string; hash: string }>

  /**
   * Vérifie si un fichier existe
   */
  abstract fileExists(filePath: string): Promise<boolean>

  /**
   * Supprime un fichier
   */
  abstract deleteFile(filePath: string): Promise<void>

  /**
   * Retourne l'URL publique d'un fichier
   */
  abstract getFileUrl(filePath: string): Promise<string>

  /**
   * Génère une URL signée à durée limitée pour un fichier
   */
  abstract getSignedUrl(filePath: string, expirationInMinutes?: number): Promise<string>

  /**
   * Crée une nouvelle version d'un fichier existant
   */
  abstract createNewVersion(
    file: MultipartFile,
    objectUuid: string,
    userId: number
  ): Promise<ObjectModel>

  /**
   * Récupère l'historique des versions d'un fichier
   */
  abstract getFileVersions(objectUuid: string): Promise<ObjectModel[]>

  /**
   * Restaure une version antérieure d'un fichier comme version actuelle
   */
  abstract restoreVersion(versionUuid: string, userId: number): Promise<ObjectModel>

  /**
   * Met à jour les métadonnées d'un fichier
   */
  abstract updateMetadata(
    objectUuid: string,
    updates: Partial<Pick<ObjectModel, 'name' | 'mimeType'>>
  ): Promise<ObjectModel>

  /**
   * Déplace un fichier d'un dossier à un autre
   */
  abstract moveFile(
    objectUuid: string,
    targetFolderId: number,
    userId: number
  ): Promise<ObjectModel>

  /**
   * Recherche des fichiers par métadonnées
   */
  abstract searchByMetadata(
    criteria: Partial<Pick<ObjectModel, 'name' | 'mimeType'>>,
    folderId?: number,
    userId?: number
  ): Promise<ObjectModel[]>
}
