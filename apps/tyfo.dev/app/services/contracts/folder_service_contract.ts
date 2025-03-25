import Folder from '#models/folder'

export interface FolderServiceContract {
  createFolder(data: Partial<Folder>): Promise<Folder>
  updateFolder(folderUuid: string, data: Partial<Folder>): Promise<Folder>
  deleteFolder(folderUuid: string): Promise<void>
  listFolders(): Promise<Folder[]>
  listFoldersByUser(userUuid: string): Promise<Folder[]>
  listFoldersByCircle(circleUuid: string): Promise<Folder[]>
  listFoldersByUserAndCircle(userUuid: string, circleUuid: string): Promise<Folder[]>
  listFoldersByFolderAndUser(folderUuid: string, userUuid: string): Promise<Folder[]>
  listFoldersByFolderAndCircle(folderUuid: string, circleUuid: string): Promise<Folder[]>
  listFoldersByFolderAndUserAndCircle(
    folderUuid: string,
    userUuid: string,
    circleUuid: string
  ): Promise<Folder[]>
}
