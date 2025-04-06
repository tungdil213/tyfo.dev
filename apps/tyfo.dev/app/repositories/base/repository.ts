// repositories/base/repository.ts
import type { LucidModel, LucidRow, ModelAttributes } from '@adonisjs/lucid/types/model'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import console from 'node:console'

export default abstract class Repository<T extends LucidRow> {
  protected model: LucidModel

  constructor(model: LucidModel) {
    this.model = model
  }

  async findById(id: number): Promise<T | null> {
    return this.model.find(id) as Promise<T | null>
  }

  async findByUuid(uuid: string): Promise<T | null> {
    return this.model.findBy('uuid', uuid) as Promise<T | null>
  }

  async findByIdOrFail(id: number): Promise<T> {
    const entity = await this.findById(id)
    if (!entity) {
      throw new ResourceNotFoundException(this.model.name, id)
    }
    return entity
  }

  async findByUuidOrFail(uuid: string): Promise<T> {
    const entity = await this.findByUuid(uuid)
    if (!entity) {
      throw new ResourceNotFoundException(this.model.name, uuid)
    }
    return entity
  }

  async create(data: Partial<ModelAttributes<T>>): Promise<T> {
    return (await this.model.create(data)) as T
  }

  async update(uuid: string, data: Partial<ModelAttributes<T>>): Promise<T> {
    const entity = await this.findByUuidOrFail(uuid)
    return (await entity.merge(data as any).save()) as T
  }

  async delete(uuid: string): Promise<void> {
    const entity = await this.findByUuidOrFail(uuid)
    await entity.delete()
  }

  async getAll(params?: any): Promise<T[]> {
    const query = this.query()
    if (params) {
      // Ici vous pouvez implémenter une logique pour traiter les paramètres
      // Exemple: pagination, filtres, etc.
    }
    return query.exec() as unknown as Promise<T[]>
  }

  async findBy(key: string, value: any): Promise<T | null> {
    return this.model.findBy(key, value) as Promise<T | null>
  }

  query(): ModelQueryBuilderContract<LucidModel> {
    return this.model.query()
  }
}
