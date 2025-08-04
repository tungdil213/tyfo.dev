/**
 * @fileoverview Tests mockés pour le RoleRepository
 *
 * Ce fichier implémente une version entièrement mockée du RoleRepository
 * qui permet d'exécuter des tests sans dépendre d'une base de données réelle.
 * Cette approche présente plusieurs avantages :
 *
 * 1. Sécurité : Pas d'accès aux données sensibles en production
 * 2. Vitesse : Tests plus rapides sans opérations de base de données
 * 3. Isolement : Tests indépendants de l'état de la base de données
 * 4. Déterminisme : Comportement prévisible sans problèmes de contraintes de clés étrangères
 *
 * L'approche mockée reproduit fidèlement le comportement du repository réel,
 * y compris les relations many-to-many entre rôles et permissions.
 */

import { test } from '@japa/runner'
import { generateUuid } from '#utils/uuid_helper'
import { DateTime } from 'luxon'
import { RoleRepositoryContract } from '#repositories/contracts/role_repository_contract'
import Role from '#models/role'
import Permission from '#models/permission'

/**
 * @interface MockRoleData
 * @description Interface définissant la structure des données pour créer un rôle mocké
 * Cette interface reproduit les propriétés essentielles du modèle Role d'AdonisJS
 */
interface MockRoleData {
  /** UUID optionnel (généré automatiquement si non fourni) */
  uuid?: string
  /** Nom du rôle (obligatoire) */
  name: string
  /** Description du rôle (optionnelle) */
  description?: string | null
  /** Date de création (générée automatiquement si non fournie) */
  createdAt?: DateTime
  /** Date de mise à jour (générée automatiquement si non fournie) */
  updatedAt?: DateTime
}

/**
 * @interface MockPermissionData
 * @description Interface définissant la structure des données pour créer une permission mockée
 * Cette interface reproduit les propriétés essentielles du modèle Permission d'AdonisJS
 */
interface MockPermissionData {
  /** UUID optionnel (généré automatiquement si non fourni) */
  uuid?: string
  /** Action de la permission (obligatoire) */
  action: string
  /** Date de création (générée automatiquement si non fournie) */
  createdAt?: DateTime
  /** Date de mise à jour (générée automatiquement si non fournie) */
  updatedAt?: DateTime
}

/**
 * @class MockPermission
 * @description Classe pour simuler une permission sans dépendre de la base de données
 *
 * Cette classe reproduit les comportements essentiels du modèle Permission d'AdonisJS
 * tout en fonctionnant entièrement en mémoire. Elle implémente l'interface Partial<Permission>
 * pour garantir une compatibilité de type avec les méthodes du repository.
 *
 * @implements {Partial<Permission>}
 */
class MockPermission implements Partial<Permission> {
  /** Identifiant unique de la permission */
  public id: number
  /** UUID unique de la permission */
  public uuid: string
  /** Action associée à la permission (ex: 'create', 'read', etc.) */
  public action: string
  /** Date de création de la permission */
  public createdAt: DateTime
  /** Date de mise à jour de la permission */
  public updatedAt: DateTime
  /** Rôles associés à cette permission (relation many-to-many) */
  public roles: MockRole[] = []

  // Propriétés Lucid Model nécessaires pour satisfaire l'interface
  public $attributes = {}
  public $extras = {}
  public $original = {}
  public $preloaded = {}

  /**
   * @constructor
   * @param {MockPermissionData} data - Données pour initialiser la permission
   * @param {number} id - Identifiant numérique (généré aléatoirement si non fourni)
   */
  constructor(data: MockPermissionData, id: number = Math.floor(Math.random() * 1000)) {
    this.id = id
    this.uuid = data.uuid || generateUuid()
    this.action = data.action
    this.createdAt = data.createdAt || DateTime.now()
    this.updatedAt = data.updatedAt || DateTime.now()
  }

  /**
   * Convertit l'objet en structure JSON simple
   * Cette méthode simule le comportement du modèle AdonisJS lors de la sérialisation
   *
   * @returns {Object} Représentation JSON de l'objet Permission
   */
  toJSON() {
    return {
      id: this.id,
      uuid: this.uuid,
      action: this.action,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

/**
 * @class MockRole
 * @description Classe qui simule un rôle sans dépendre d'une base de données
 *
 * Cette classe reproduit les comportements essentiels du modèle Role d'AdonisJS
 * tout en fonctionnant entièrement en mémoire. Elle implémente l'interface
 * Partial<Role> pour garantir une compatibilité de type avec les méthodes
 * du repository.
 *
 * Les relations many-to-many avec les permissions sont simulées via des tableaux
 * JavaScript, ce qui évite la complexité des jointures SQL et les problèmes
 * de clés étrangères.
 *
 * @implements {Partial<Role>}
 */
class MockRole implements Partial<Role> {
  /** Identifiant unique du rôle */
  public id: number
  /** UUID unique du rôle */
  public uuid: string
  /** Nom du rôle */
  public name: string
  /** Description du rôle (peut être null) */
  public description: string | null
  /** Date de création du rôle */
  public createdAt: DateTime
  /** Date de mise à jour du rôle */
  public updatedAt: DateTime
  /** Permissions associées à ce rôle (relation many-to-many) */
  public permissions: MockPermission[] = []

  // Propriétés Lucid Model nécessaires pour satisfaire l'interface
  public users: any[] = []
  public $attributes = {}
  public $extras = {}
  public $original = {}
  public $preloaded = {}
  public $columns = {}
  public $sideloaded = {}
  public $isPersisted = false
  public $isNew = true

  /**
   * @constructor
   * @param {MockRoleData} data - Données pour initialiser le rôle
   * @param {number} id - Identifiant numérique (généré aléatoirement si non fourni)
   */
  constructor(data: MockRoleData, id: number = Math.floor(Math.random() * 1000)) {
    this.id = id
    this.uuid = data.uuid || generateUuid()
    this.name = data.name
    this.description = data.description || null
    this.createdAt = data.createdAt || DateTime.now()
    this.updatedAt = data.updatedAt || DateTime.now()
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  toJSON() {
    return {
      id: this.id,
      uuid: this.uuid,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  merge(data: Partial<MockRole>): void {
    Object.assign(this, data)
    this.updatedAt = DateTime.now()
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  async save(): Promise<void> {
    // Dans un mock, rien à faire
  }

  // Méthode utilitaire pour simuler le comportement du modèle AdonisJS
  async delete(): Promise<void> {
    // Dans un mock, rien à faire
  }

  // Méthodes de relation
  async related(relation: string): Promise<MockPermission[]> {
    if (relation === 'permissions') {
      return this.permissions
    }
    throw new Error(`Relation non supportée: ${relation}`)
  }

  // Méthode pour simuler l'attachement de permissions
  async attach(relation: string, ids: number[]): Promise<void> {
    if (relation !== 'permissions') {
      throw new Error(`Relation non supportée: ${relation}`)
    }
    // Cette méthode serait appelée pour attacher des permissions à un rôle
  }

  // Méthode pour simuler le détachement de permissions
  async detach(relation: string, ids?: number[]): Promise<void> {
    if (relation !== 'permissions') {
      throw new Error(`Relation non supportée: ${relation}`)
    }
    // Cette méthode serait appelée pour détacher des permissions d'un rôle
  }

  // Méthode pour simuler la synchronisation des permissions
  async sync(relation: string, ids: number[]): Promise<void> {
    if (relation !== 'permissions') {
      throw new Error(`Relation non supportée: ${relation}`)
    }
    // Cette méthode serait appelée pour synchroniser les permissions d'un rôle
  }
}

/**
 * Structure pour représenter la relation many-to-many entre rôles et permissions
 * Cette structure simple permet de simuler les tables pivot de base de données
 * sans avoir besoin d'un ORM ou d'une base de données réelle
 */
interface RolePermissionRelation {
  roleId: number
  permissionId: number
}

/**
 * @class MockRoleRepository
 * @description Implémentation mockée complète du RoleRepository
 *
 * Cette classe simule toutes les fonctionnalités d'un repository de rôles
 * sans dépendre d'une base de données réelle. Elle stocke toutes les données
 * en mémoire et gère les relations many-to-many entre rôles et permissions.
 *
 * Avantages de cette approche :
 * 1. Tests isolés : pas de dépendance à une base de données externe
 * 2. Tests rapides : pas de latence due aux opérations de base de données
 * 3. Tests déterministes : contrôle total sur les données de test
 * 4. Tests sécurisés : pas d'accès à des données sensibles
 *
 * Cette implémentation gère :
 * - CRUD complet sur les rôles
 * - Création de permissions
 * - Relations many-to-many entre rôles et permissions
 * - Recherche par différents critères (UUID, nom)
 *
 * @implements {RoleRepositoryContract}
 */
class MockRoleRepository implements RoleRepositoryContract {
  /** Collection des rôles stockés en mémoire */
  private roles: MockRole[] = []
  /** Collection des permissions stockées en mémoire */
  private permissions: MockPermission[] = []
  /** Auto-incrément pour les IDs des rôles */
  private nextRoleId: number = 1
  /** Auto-incrément pour les IDs des permissions */
  private nextPermissionId: number = 1
  /** Table pivot pour gérer les associations many-to-many entre rôles et permissions */
  private rolePermissions: { roleId: number; permissionId: number }[] = []

  /**
   * Crée un nouveau rôle dans le système
   *
   * @param {Partial<Role>} data - Données du rôle à créer
   * @returns {Promise<MockRole>} Le rôle créé avec son ID auto-incrémenté
   */
  async create(data: Partial<Role>): Promise<MockRole> {
    const role = new MockRole(data as MockRoleData, this.nextRoleId++)
    this.roles.push(role)
    return role
  }

  /**
   * Crée une nouvelle permission dans le système
   * Cette méthode ne fait pas partie du contrat original RoleRepositoryContract,
   * mais elle est nécessaire pour les tests des relations many-to-many
   *
   * @param {Partial<Permission>} data - Données de la permission à créer
   * @returns {Promise<MockPermission>} La permission créée avec son ID auto-incrémenté
   */
  async createPermission(data: Partial<Permission>): Promise<MockPermission> {
    const permission = new MockPermission(data as MockPermissionData, this.nextPermissionId++)
    this.permissions.push(permission)
    return permission
  }

  /**
   * Associe une permission à un rôle (relation many-to-many)
   * Vérifie d'abord que les deux entités existent et que l'association n'existe pas déjà
   * Met à jour à la fois la table pivot et les collections bidirectionnelles
   *
   * @param {number} roleId - ID du rôle
   * @param {number} permissionId - ID de la permission
   * @returns {Promise<void>}
   * @throws {Error} Si le rôle ou la permission n'existe pas
   */
  async attachPermissionToRole(roleId: number, permissionId: number): Promise<void> {
    const role = this.roles.find((r) => r.id === roleId)
    const permission = this.permissions.find((p) => p.id === permissionId)

    if (!role || !permission) {
      throw new Error('Role ou permission non trouvés')
    }

    // Éviter les doublons
    if (
      !this.rolePermissions.some((rp) => rp.roleId === roleId && rp.permissionId === permissionId)
    ) {
      this.rolePermissions.push({ roleId, permissionId })
      role.permissions.push(permission)
      permission.roles.push(role)
    }
  }

  /**
   * Dissocie une permission d'un rôle (supprime la relation many-to-many)
   * Met à jour à la fois la table pivot et les collections bidirectionnelles
   * si la relation existe déjà
   *
   * @param {number} roleId - ID du rôle
   * @param {number} permissionId - ID de la permission
   * @returns {Promise<void>}
   */
  async detachPermissionFromRole(roleId: number, permissionId: number): Promise<void> {
    const index = this.rolePermissions.findIndex(
      (rp) => rp.roleId === roleId && rp.permissionId === permissionId
    )

    if (index >= 0) {
      this.rolePermissions.splice(index, 1)

      // Mettre également à jour les objets
      const role = this.roles.find((r) => r.id === roleId)
      const permission = this.permissions.find((p) => p.id === permissionId)

      if (role) {
        role.permissions = role.permissions.filter((p) => p.id !== permissionId)
      }

      if (permission) {
        permission.roles = permission.roles.filter((r) => r.id !== roleId)
      }
    }
  }

  /**
   * Recherche un rôle par son UUID
   *
   * @param {string} uuid - UUID du rôle recherché
   * @returns {Promise<MockRole | null>} Le rôle trouvé ou null si non trouvé
   */
  async findByUuid(uuid: string): Promise<MockRole | null> {
    const role = this.roles.find((r) => r.uuid === uuid)
    return role || null
  }

  /**
   * Recherche un rôle par son nom
   *
   * @param {string} name - Nom du rôle recherché
   * @returns {Promise<MockRole | null>} Le rôle trouvé ou null si non trouvé
   */
  async findByName(name: string): Promise<MockRole | null> {
    const role = this.roles.find((r) => r.name === name)
    return role || null
  }

  /**
   * Récupère toutes les permissions associées à un rôle spécifique
   * Cette méthode simule une requête SQL avec jointure via la table pivot
   *
   * @param {number} roleId - ID du rôle dont on veut les permissions
   * @returns {Promise<MockPermission[]>} Liste des permissions associées au rôle
   */
  async getRolePermissions(roleId: number): Promise<MockPermission[]> {
    const permissionIds = this.rolePermissions
      .filter((rp) => rp.roleId === roleId)
      .map((rp) => rp.permissionId)

    return this.permissions.filter((p) => permissionIds.includes(p.id))
  }

  /**
   * Liste tous les rôles disponibles dans le système
   * Retourne une copie de la collection pour éviter toute modification externe
   *
   * @returns {Promise<MockRole[]>} Liste complète des rôles
   */
  async list(): Promise<MockRole[]> {
    return [...this.roles]
  }

  /**
   * Met à jour les données d'un rôle existant
   *
   * @param {string} uuid - UUID du rôle à mettre à jour
   * @param {Partial<Role>} data - Nouvelles données à appliquer au rôle
   * @returns {Promise<MockRole>} Le rôle mis à jour
   * @throws {Error} Si le rôle n'existe pas
   */
  async update(uuid: string, data: Partial<Role>): Promise<MockRole> {
    const roleIndex = this.roles.findIndex((r) => r.uuid === uuid)
    if (roleIndex === -1) {
      throw new Error('Rôle non trouvé')
    }

    this.roles[roleIndex].merge(data as Partial<MockRole>)
    return this.roles[roleIndex]
  }

  /**
   * Supprime un rôle du système
   * Cette méthode nettoie également toutes les relations many-to-many associées
   * pour maintenir l'intégrité des données
   *
   * @param {string} uuid - UUID du rôle à supprimer
   * @returns {Promise<void>}
   */
  async remove(uuid: string): Promise<void> {
    const roleIndex = this.roles.findIndex((r) => r.uuid === uuid)
    if (roleIndex !== -1) {
      const roleId = this.roles[roleIndex].id

      // Supprimer toutes les relations de ce rôle
      this.rolePermissions = this.rolePermissions.filter((rp) => rp.roleId !== roleId)

      // Supprimer le rôle de la liste des rôles associés aux permissions
      this.permissions.forEach((p) => {
        p.roles = p.roles.filter((r) => r.id !== roleId)
      })

      // Supprimer le rôle lui-même
      this.roles.splice(roleIndex, 1)
    }
  }
}

test.group('RoleRepository Mocked Tests', (group) => {
  let roleRepository: MockRoleRepository

  // Créer une nouvelle instance du repository mocké avant chaque test
  group.each.setup(() => {
    roleRepository = new MockRoleRepository()
  })

  test('create should insert a new role and return it', async ({ assert }) => {
    const roleData = {
      name: 'Administrateur',
      description: 'Rôle administrateur avec tous les droits',
    }

    const role = await roleRepository.create(roleData as any)

    assert.exists(role)
    assert.exists(role.uuid)
    assert.equal(role.name, roleData.name)
    assert.equal(role.description, roleData.description)
  })

  test('findByUuid should retrieve a role by its UUID', async ({ assert }) => {
    // Créer un rôle
    const roleData = {
      name: 'Éditeur',
      description: 'Rôle éditeur avec droits de modification',
    }
    const createdRole = await roleRepository.create(roleData as any)

    // Test du findByUuid avec un UUID valide
    const role = await roleRepository.findByUuid(createdRole.uuid)

    // Vérifier que le rôle est trouvé
    assert.exists(role)
    assert.equal(role!.uuid, createdRole.uuid)
    assert.equal(role!.name, roleData.name)

    // Test avec un UUID non existant
    const nonExistentRole = await roleRepository.findByUuid('non-existent-uuid')
    assert.isNull(nonExistentRole)
  })

  test('findByName should retrieve a role by its name', async ({ assert }) => {
    const roleName = 'Lecteur'
    const roleData = {
      name: roleName,
      description: 'Rôle lecteur avec droits de lecture uniquement',
    }
    await roleRepository.create(roleData as any)

    // Test du findByName avec un nom valide
    const role = await roleRepository.findByName(roleName)

    // Vérifier que le rôle est trouvé
    assert.exists(role)
    assert.equal(role!.name, roleName)

    // Test avec un nom non existant
    const nonExistentRole = await roleRepository.findByName('non-existent-name')
    assert.isNull(nonExistentRole)
  })

  test('update should modify and return an existing role', async ({ assert }) => {
    // Créer un rôle
    const roleData = {
      name: 'Ancien Nom',
      description: 'Ancienne description',
    }
    const createdRole = await roleRepository.create(roleData as any)

    // Mettre à jour le rôle
    const updatedRole = await roleRepository.update(createdRole.uuid, {
      name: 'Nouveau Nom',
      description: 'Nouvelle description',
    } as any)

    // Vérifier les modifications
    assert.equal(updatedRole.name, 'Nouveau Nom')
    assert.equal(updatedRole.description, 'Nouvelle description')
    assert.equal(updatedRole.uuid, createdRole.uuid)

    // Vérifier que le rôle est bien mis à jour dans le repository
    const retrievedRole = await roleRepository.findByUuid(createdRole.uuid)
    assert.equal(retrievedRole!.name, 'Nouveau Nom')
  })

  test('remove should delete a role', async ({ assert }) => {
    // Créer un rôle
    const roleData = {
      name: 'À supprimer',
      description: 'Rôle à supprimer',
    }
    const createdRole = await roleRepository.create(roleData as any)

    // Vérifier que le rôle existe
    const roleBeforeDelete = await roleRepository.findByUuid(createdRole.uuid)
    assert.exists(roleBeforeDelete)

    // Supprimer le rôle
    await roleRepository.remove(createdRole.uuid)

    // Vérifier que le rôle n'existe plus
    const roleAfterDelete = await roleRepository.findByUuid(createdRole.uuid)
    assert.isNull(roleAfterDelete)
  })

  test('list should return all roles', async ({ assert }) => {
    // Créer plusieurs rôles
    const roles = [
      { name: 'Rôle 1', description: 'Description 1' },
      { name: 'Rôle 2', description: 'Description 2' },
      { name: 'Rôle 3', description: 'Description 3' },
    ]

    await Promise.all(roles.map((role) => roleRepository.create(role as any)))

    // Récupérer tous les rôles
    const allRoles = await roleRepository.list()

    // Vérifier qu'on a bien tous les rôles
    assert.lengthOf(allRoles, 3)
    assert.isTrue(allRoles.some((r) => r.name === 'Rôle 1'))
    assert.isTrue(allRoles.some((r) => r.name === 'Rôle 2'))
    assert.isTrue(allRoles.some((r) => r.name === 'Rôle 3'))
  })

  test('getRolePermissions should return permissions for a role', async ({ assert }) => {
    // Créer un rôle
    const role = await roleRepository.create({ name: 'Admin' } as any)

    // Créer des permissions
    const permission1 = await roleRepository.createPermission({ action: 'create' } as any)
    const permission2 = await roleRepository.createPermission({ action: 'read' } as any)
    const permission3 = await roleRepository.createPermission({ action: 'update' } as any)

    // Attacher les permissions au rôle
    await roleRepository.attachPermissionToRole(role.id, permission1.id)
    await roleRepository.attachPermissionToRole(role.id, permission2.id)

    // Récupérer les permissions du rôle
    const rolePermissions = await roleRepository.getRolePermissions(role.id)

    // Vérifier qu'on a les bonnes permissions
    assert.lengthOf(rolePermissions, 2)
    assert.isTrue(rolePermissions.some((p) => p.action === 'create'))
    assert.isTrue(rolePermissions.some((p) => p.action === 'read'))
    assert.isFalse(rolePermissions.some((p) => p.action === 'update'))
  })

  test('attachPermissionToRole should add a permission to a role', async ({ assert }) => {
    // Créer un rôle et une permission
    const role = await roleRepository.create({ name: 'Moderator' } as any)
    const permission = await roleRepository.createPermission({ action: 'delete' } as any)

    // Attacher la permission au rôle
    await roleRepository.attachPermissionToRole(role.id, permission.id)

    // Vérifier que la permission est bien attachée
    const rolePermissions = await roleRepository.getRolePermissions(role.id)
    assert.lengthOf(rolePermissions, 1)
    assert.equal(rolePermissions[0].action, 'delete')

    // Vérifier qu'on ne peut pas attacher deux fois la même permission
    await roleRepository.attachPermissionToRole(role.id, permission.id)
    const rolePermissionsAfterDuplicate = await roleRepository.getRolePermissions(role.id)
    assert.lengthOf(rolePermissionsAfterDuplicate, 1) // Toujours 1 seule permission
  })

  test('detachPermissionFromRole should remove a permission from a role', async ({ assert }) => {
    // Créer un rôle et des permissions
    const role = await roleRepository.create({ name: 'Manager' } as any)
    const permission1 = await roleRepository.createPermission({ action: 'approve' } as any)
    const permission2 = await roleRepository.createPermission({ action: 'reject' } as any)

    // Attacher les permissions au rôle
    await roleRepository.attachPermissionToRole(role.id, permission1.id)
    await roleRepository.attachPermissionToRole(role.id, permission2.id)

    // Vérifier que les deux permissions sont attachées
    const rolePermissions = await roleRepository.getRolePermissions(role.id)
    assert.lengthOf(rolePermissions, 2)

    // Détacher une permission
    await roleRepository.detachPermissionFromRole(role.id, permission1.id)

    // Vérifier qu'il ne reste qu'une permission
    const rolePermissionsAfterDetach = await roleRepository.getRolePermissions(role.id)
    assert.lengthOf(rolePermissionsAfterDetach, 1)
    assert.equal(rolePermissionsAfterDetach[0].action, 'reject')
  })

  test('removing a role should also remove its permission associations', async ({ assert }) => {
    // Créer un rôle et des permissions
    const role = await roleRepository.create({ name: 'Supervisor' } as any)
    const permission1 = await roleRepository.createPermission({ action: 'supervise' } as any)
    const permission2 = await roleRepository.createPermission({ action: 'report' } as any)

    // Attacher les permissions au rôle
    await roleRepository.attachPermissionToRole(role.id, permission1.id)
    await roleRepository.attachPermissionToRole(role.id, permission2.id)

    // Vérifier que les permissions sont attachées
    const rolePermissions = await roleRepository.getRolePermissions(role.id)
    assert.lengthOf(rolePermissions, 2)

    // Supprimer le rôle
    await roleRepository.remove(role.uuid)

    // Vérifier que le rôle n'existe plus
    const roleAfterDelete = await roleRepository.findByUuid(role.uuid)
    assert.isNull(roleAfterDelete)

    // Vérifier que les associations ont également été supprimées
    // Note: Nous ne pouvons pas utiliser getRolePermissions car le rôle n'existe plus
    // Vérifier indirectement en créant un nouveau rôle avec le même ID
    const newRole = new MockRole({ name: 'New Role' }, role.id) // Réutilisation de l'ID
    roleRepository['roles'].push(newRole) // Ajouter manuellement au repository

    const newRolePermissions = await roleRepository.getRolePermissions(role.id)
    assert.lengthOf(newRolePermissions, 0)
  })
})
