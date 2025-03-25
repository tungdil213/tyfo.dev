import { inject } from '@adonisjs/core'
import { FileServiceContract } from '#services/contracts/file_service_contract'
import Drive from '@ioc:Adonis/Core/Drive

@inject()
export default class FileService implements FileServiceContract {
  public async uploadFile(file: any, path: string): Promise<string> {
    await file.move(path)
    return file.fileName
  }

  public async getFileUrl(filePath: string): Promise<string> {
    return await Drive.getUrl(filePath)
  }
}
