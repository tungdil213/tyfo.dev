import type { LucidModel, LucidRow, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export abstract class BaseRepositoryContract<T extends LucidRow> {
  abstract findById(id: number): Promise<T | null>
  abstract findByUuid(uuid: string): Promise<T | null>
  abstract findByIdOrFail(id: number): Promise<T>
  abstract findByUuidOrFail(uuid: string): Promise<T>

  abstract create(data: Partial<T>): Promise<T>
  abstract update(uuid: string, data: Partial<T>): Promise<T>
  abstract delete(uuid: string): Promise<void>

  // Méthodes communes potentielles
  abstract getAll(params?: any): Promise<T[]>
  abstract findBy(key: string, value: any): Promise<T | null>
  abstract query(): ModelQueryBuilderContract<LucidModel>
}
