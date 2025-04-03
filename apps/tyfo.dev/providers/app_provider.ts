import { ApplicationService } from '@adonisjs/core/types'
import ObjectRepository from '#repositories/object_repository'
import UserRepository from '#repositories/user_repository'
import RoleRepository from '#repositories/role_repository'
import PermissionRepository from '#repositories/permission_repository'
import NotificationRepository from '#repositories/notification_repository'
import LogRepository from '#repositories/log_repository'
import FolderRepository from '#repositories/folder_repository'
import CircleRepository from '#repositories/circle_repository'
import AttributionRepository from '#repositories/attribution_repository'
import StorageService from '#services/storage_service'
import drive from '#config/drive'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    this.app.container.bind(ObjectRepository, () => {
      return new ObjectRepository()
    })
    this.app.container.bind(UserRepository, () => {
      return new UserRepository()
    })
    this.app.container.bind(RoleRepository, () => {
      return new RoleRepository()
    })
    this.app.container.bind(PermissionRepository, () => {
      return new PermissionRepository()
    })
    this.app.container.bind(NotificationRepository, () => {
      return new NotificationRepository()
    })
    this.app.container.bind(LogRepository, () => {
      return new LogRepository()
    })
    this.app.container.bind(FolderRepository, () => {
      return new FolderRepository()
    })
    this.app.container.bind(CircleRepository, () => {
      return new CircleRepository()
    })
    this.app.container.bind(AttributionRepository, () => {
      return new AttributionRepository()
    })
  }

  async register() {
    const Storage = await import('#services/storage_service')
    this.app.container.bind(StorageService, async () => {
      const objectRepository = await this.app.container.make(ObjectRepository)
      return await this.app.container.make(Storage, [objectRepository])
    })
  }
}

/**
 * Type helper pour accéder au provider depuis l'app
 */
declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    objectRepository: ObjectRepository
    userRepository: UserRepository
    roleRepository: RoleRepository
    permissionRepository: PermissionRepository
    notificationRepository: NotificationRepository
    logRepository: LogRepository
    folderRepository: FolderRepository
    circleRepository: CircleRepository
    attributionRepository: AttributionRepository
    storageService: StorageService
  }
}
