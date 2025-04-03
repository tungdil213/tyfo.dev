import drive from '@adonisjs/drive/services/main'
import { createHash, randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { StorageContract } from '#services/contracts/storage_contract'
import env from '#start/env'
import FileProcessingException from '#exceptions/file_processing_exception'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { inject } from '@adonisjs/core'
import ObjectRepository from '#repositories/object_repository'
import ObjectModel from '#models/object'

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
        uuid: randomUUID(),
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
}
