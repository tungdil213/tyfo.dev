import File from '#models/object'

export interface FileServiceContract {
  uploadFile(data: Partial<File>): Promise<File>
  updateFileMetadata(fileId: string, data: Partial<File>): Promise<File>
  deleteFile(fileId: string): Promise<void>
  listFiles(folderId: string): Promise<File[]>
  downloadFile(fileId: string): Promise<string>
  uploadNewVersion(fileId: string, fileData: any): Promise<File>
}
