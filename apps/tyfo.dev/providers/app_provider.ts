import AttributionRepository from '#repositories/attribution_repository'
import CircleRepository from '#repositories/circle_repository'
import FolderRepository from '#repositories/folder_repository'
import LogRepository from '#repositories/log_repository'
import NotificationRepository from '#repositories/notification_repository'
import ObjectRepository from '#repositories/object_repository'
import PermissionRepository from '#repositories/permission_repository'
import RoleRepository from '#repositories/role_repository'
import UserRepository from '#repositories/user_repository'
import CircleService from '#services/circle_service'
import FolderService from '#services/folder_service'
import { LogService } from '#services/log_service'
import NotificationService from '#services/notification_service'
import PermissionService from '#services/permission_service'
import RoleService from '#services/role_service'
import StorageService from '#services/storage_service'
import { UserService } from '#services/user_service'
import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  private registerRepository<
    T extends abstract new (...args: any[]) => any,
    V extends new (...args: any[]) => InstanceType<T>,
  >(repositoryInterface: T, defaultImplementation: V) {
    this.app.container.singleton(repositoryInterface, async () => {
      return new defaultImplementation()
    })
  }

  async register() {
    this.registerRepository(ObjectRepository, ObjectRepository)
    this.registerRepository(UserRepository, UserRepository)
    this.registerRepository(RoleRepository, RoleRepository)
    this.registerRepository(PermissionRepository, PermissionRepository)
    this.registerRepository(NotificationRepository, NotificationRepository)
    this.registerRepository(LogRepository, LogRepository)
    this.registerRepository(FolderRepository, FolderRepository)
    this.registerRepository(CircleRepository, CircleRepository)
    this.registerRepository(AttributionRepository, AttributionRepository)
    this.registerRepository(StorageService, StorageService)
    this.registerRepository(UserService, UserService)
    this.registerRepository(RoleService, RoleService)
    this.registerRepository(PermissionService, PermissionService)
    this.registerRepository(NotificationService, NotificationService)
    this.registerRepository(LogService, LogService)
    this.registerRepository(FolderService, FolderService)
    this.registerRepository(CircleService, CircleService)
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
    userService: UserService
    roleService: RoleService
    permissionService: PermissionService
    notificationService: NotificationService
    logService: LogService
    folderService: FolderService
    circleService: CircleService
  }
}
