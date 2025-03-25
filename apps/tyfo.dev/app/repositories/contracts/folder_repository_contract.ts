import Folder from '#models/folder'

export abstract class FolderRepositoryContract {
  abstract create(data: Partial<Folder>): Promise<Folder>
  abstract update(folderUuid: string, data: Partial<Folder>): Promise<Folder>
  abstract delete(folderUuid: string): Promise<void>
  abstract findByUuid(folderUuid: string): Promise<Folder | null>
  abstract findByName(name: string): Promise<Folder | null>
  abstract list(): Promise<Folder[]>
  abstract listByCircleUuid(circleUuid: string): Promise<Folder[]>
  abstract listByRole(roleUuid: string): Promise<Folder[]>
  abstract listByUser(userId: number): Promise<Folder[]>
  abstract listByCircleAndRole(circleUuid: string, roleUuid: string): Promise<Folder[]>
  abstract listByCircleAndUser(circleUuid: string, userId: number): Promise<Folder[]>
  abstract listByRoleAndUser(roleUuid: string, userId: number): Promise<Folder[]>
  abstract listByCircleAndRoleAndUser(
    circleUuid: string,
    roleUuid: string,
    userId: number
  ): Promise<Folder[]>
  abstract listByCircleAndRoleAndUserAndObject(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string
  ): Promise<Folder[]>
  abstract listByCircleAndRoleAndUserAndObjectAndFolder(
    circleUuid: string,
    roleUuid: string,
    userId: number,
    objectUuid: string,
    folderUuid: string
  ): Promise<Folder[]>
}
