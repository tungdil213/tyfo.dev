import ObjectModel from '#models/object'

export interface ObjectModelServiceContract {
  uploadFile(data: Partial<ObjectModel>): Promise<ObjectModel>
  deleteFile(objectUuid: string): Promise<void>
  updateFile(objectUuid: string, data: Partial<ObjectModel>): Promise<ObjectModel>
  listFiles(): Promise<ObjectModel[]>
  listFilesByFolder(folderUuid: string): Promise<ObjectModel[]>
  listFilesByObjectAndFolder(objectUuid: string, folderUuid: string): Promise<ObjectModel[]>
  listFilesByObjectAndFolderAndUser(
    objectUuid: string,
    folderUuid: string,
    userUuid: string
  ): Promise<ObjectModel[]>
  listFilesByObjectAndFolderAndCircle(
    objectUuid: string,
    folderUuid: string,
    circleUuid: string
  ): Promise<ObjectModel[]>
  listFilesByObjectAndFolderAndUserAndCircle(
    objectUuid: string,
    folderUuid: string,
    userUuid: string,
    circleUuid: string
  ): Promise<ObjectModel[]>
}
