import Folder from '#models/folder'
import { FolderRepositoryContract } from '#repositories/contracts/folder_repository_contract'
import { DateTime } from 'luxon'

export default class FolderRepository implements FolderRepositoryContract {
  async listByCircleUuid(circleUuid: string): Promise<Folder[]> {
    return await Folder.query().where('circle_uuid', circleUuid)
  }
  async listByRole(roleUuid: string): Promise<Folder[]> {
    return await Folder.query().where('role_uuid', roleUuid)
  }
  async listByUser(userId: number): Promise<Folder[]> {
    return await Folder.query().where('user_id', userId)
  }
  async listByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Folder[]> {
    return await Folder.query().where('circle_uuid', circleUuid).where('role_uuid', roleUuid)
  }
  async listByRoleAndUser(roleUuid: string, userId: number): Promise<Folder[]> {
    return await Folder.query().where('role_uuid', roleUuid).where('user_id', userId)
  }
  async listByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Folder[]> {
    return await Folder.query()
      .where('circle_uuid', circleUuid)
      .where('role_uuid', roleUuid)
      .where('user_id', userId)
  }
  async listByCircleAndRoleAndUserAndObject(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string
  ): Promise<Folder[]> {
    return await Folder.query()
      .where('circle_uuid', circleUuid)
      .where('role_uuid', roleUuid)
      .where('user_id', userId)
      .where('object_uuid', objectUuid)
  }
  async listByCircleAndRoleAndUserAndObjectAndFolder(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string,
    folderUuid: string
  ): Promise<Folder[]> {
    return await Folder.query()
      .where('circle_uuid', circleUuid)
      .where('role_uuid', roleUuid)
      .where('user_id', userId)
      .where('object_uuid', objectUuid)
      .where('folder_uuid', folderUuid)
  }

  public async create(data: Partial<Folder>): Promise<Folder> {
    return await Folder.create(data)
  }

  public async update(folderUuid: string, data: Partial<Folder>): Promise<Folder> {
    return await Folder.query()
      .where('uuid', folderUuid)
      .update({ ...data, updated_at: DateTime.now() })
      .firstOrFail()
  }

  public async findByUuid(folderUuid: string): Promise<Folder | null> {
    return await Folder.findBy('uuid', folderUuid)
  }

  public async findByName(name: string): Promise<Folder | null> {
    return await Folder.findBy('name', name)
  }

  public async list(): Promise<Folder[]> {
    return await Folder.all()
  }

  public async listByCircle(circleUuid: string): Promise<Folder[]> {
    return await Folder.query().where('circle_uuid', circleUuid)
  }

  public async listByCircleAndUser(circleUuid: string, userId: number): Promise<Folder[]> {
    return await Folder.query().where('circle_uuid', circleUuid).where('user_id', userId)
  }

  public async delete(folderUuid: string): Promise<void> {
    await Folder.query().where('uuid', folderUuid).delete()
  }
}
