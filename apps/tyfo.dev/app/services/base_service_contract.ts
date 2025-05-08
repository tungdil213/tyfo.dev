import type { LucidRow } from '@adonisjs/lucid/types/model'
import type { BaseRepositoryContract } from '#repositories/contracts/base_repository_contract'

export abstract class BaseService<T extends LucidRow, R extends BaseRepositoryContract<T>> {
  constructor(protected repository: R) {}

  async findById(id: number): Promise<T | null> {
    return this.repository.findById(id)
  }

  async findByUuid(uuid: string): Promise<T | null> {
    return this.repository.findByUuid(uuid)
  }

  async findByIdOrFail(id: number): Promise<T> {
    return this.repository.findByIdOrFail(id)
  }

  async findByUuidOrFail(uuid: string): Promise<T> {
    return this.repository.findByUuidOrFail(uuid)
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data)
  }

  async update(uuid: string, data: Partial<T>): Promise<T> {
    return this.repository.update(uuid, data)
  }

  async delete(uuid: string): Promise<void> {
    return this.repository.delete(uuid)
  }

  async getAll(params?: any): Promise<T[]> {
    return this.repository.getAll(params)
  }
}
