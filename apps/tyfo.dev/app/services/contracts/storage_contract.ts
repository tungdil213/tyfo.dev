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
}
