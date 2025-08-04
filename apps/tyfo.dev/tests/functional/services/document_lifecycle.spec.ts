import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
// import Circle from '#models/circle' // Non utilisé
import ObjectModel from '#models/object'
import { generateUuid } from '#utils/uuid_helper'
import { DateTime } from 'luxon'

import StorageService from '#services/storage_service'
import ObjectRepository from '#repositories/object_repository'
import drive from '@adonisjs/drive/services/main'

// Constantes pour les états du cycle de vie
const DocumentStatus = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  REJECTED: 'rejected',
  APPROVED: 'approved',
  ARCHIVED: 'archived',
}

/**
 * Helper pour générer un email unique
 */
function generateUniqueEmail(prefix: string = 'test') {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `${prefix}_${timestamp}_${random}@example.com`
}

/**
 * Mock du DocumentLifecycleService pour les tests
 */
class MockDocumentLifecycleService {
  private documents: Map<string, any> = new Map()
  private objectRepository: ObjectRepository
  private storageService: StorageService

  constructor(objectRepository: ObjectRepository, storageService: StorageService) {
    this.objectRepository = objectRepository
    this.storageService = storageService
  }

  // Méthode publique pour accéder au repository (pour les tests)
  getObjectRepository(): ObjectRepository {
    return this.objectRepository
  }

  /**
   * Créer un nouveau document avec l'état initial (brouillon par défaut)
   */
  async createDocument(data: any, userId: number, folderId: number, status = DocumentStatus.DRAFT) {
    // Utiliser le repo existant mais ajouter un statut
    const document = await this.objectRepository.create({
      ...data,
      userId,
      folderId,
      metadata: {
        ...data.metadata,
        status,
        statusHistory: [
          {
            status,
            timestamp: DateTime.now().toISO(),
            userId,
          },
        ],
        comments: [],
      },
    })

    this.documents.set(document.uuid, document)
    return document
  }

  /**
   * Soumettre un document pour révision
   */
  async submitForReview(uuid: string, userId: number) {
    const document = await this.objectRepository.findByUuid(uuid)
    if (!document) {
      throw new Error('Document non trouvé')
    }

    if (document.userId !== userId) {
      throw new Error('Non autorisé à soumettre ce document')
    }

    if (!document.metadata || document.metadata.status !== DocumentStatus.DRAFT) {
      throw new Error('Seuls les documents en brouillon peuvent être soumis pour révision')
    }

    // Mise à jour du statut
    const updatedMetadata = {
      ...document.metadata,
      status: DocumentStatus.PENDING_REVIEW,
      statusHistory: [
        ...(document.metadata.statusHistory || []),
        {
          status: DocumentStatus.PENDING_REVIEW,
          timestamp: DateTime.now().toISO(),
          userId,
        },
      ],
    }

    const updatedDocument = await this.objectRepository.update(uuid, {
      metadata: updatedMetadata,
    })

    this.documents.set(uuid, updatedDocument)
    return updatedDocument
  }

  /**
   * Approuver un document
   */
  async approveDocument(uuid: string, userId: number, comment = '') {
    const document = await this.objectRepository.findByUuid(uuid)
    if (!document) {
      throw new Error('Document non trouvé')
    }

    if (!document.metadata || document.metadata.status !== DocumentStatus.PENDING_REVIEW) {
      throw new Error('Seuls les documents en attente de révision peuvent être approuvés')
    }

    // Mise à jour du statut
    const updatedMetadata: {
      status: string
      statusHistory: any[]
      comments?: { userId: number; timestamp: string; text: string; type: string }[]
    } = {
      ...document.metadata,
      status: DocumentStatus.APPROVED,
      statusHistory: [
        ...(document.metadata.statusHistory || []),
        {
          status: DocumentStatus.APPROVED,
          timestamp: DateTime.now().toISO(),
          userId,
          comment,
        },
      ],
    }

    if (comment) {
      updatedMetadata.comments = [
        ...(document.metadata.comments || []),
        {
          userId,
          timestamp: DateTime.now().toISO(),
          text: comment,
          type: 'approval',
        },
      ]
    }

    const updatedDocument = await this.objectRepository.update(uuid, {
      metadata: updatedMetadata,
    })

    this.documents.set(uuid, updatedDocument)
    return updatedDocument
  }

  /**
   * Rejeter un document
   */
  async rejectDocument(uuid: string, userId: number, reason = '') {
    const document = await this.objectRepository.findByUuid(uuid)
    if (!document) {
      throw new Error('Document non trouvé')
    }

    if (!document.metadata || document.metadata.status !== DocumentStatus.PENDING_REVIEW) {
      throw new Error('Seuls les documents en attente de révision peuvent être rejetés')
    }

    // Mise à jour du statut
    const updatedMetadata: {
      status: string
      statusHistory: any[]
      comments?: { userId: number; timestamp: string; text: string; type: string }[]
    } = {
      ...document.metadata,
      status: DocumentStatus.REJECTED,
      statusHistory: [
        ...(document.metadata.statusHistory || []),
        {
          status: DocumentStatus.REJECTED,
          timestamp: DateTime.now().toISO(),
          userId,
          reason,
        },
      ],
    }

    if (reason) {
      updatedMetadata.comments = [
        ...(document.metadata.comments || []),
        {
          userId,
          timestamp: DateTime.now().toISO(),
          text: reason,
          type: 'rejection',
        },
      ]
    }

    const updatedDocument = await this.objectRepository.update(uuid, {
      metadata: updatedMetadata,
    })

    this.documents.set(uuid, updatedDocument)
    return updatedDocument
  }

  /**
   * Obtenir l'historique de statut d'un document
   */
  async getStatusHistory(uuid: string) {
    const document = await this.objectRepository.findByUuid(uuid)
    if (!document || !document.metadata) {
      return []
    }
    return document.metadata.statusHistory || []
  }

  /**
   * Archiver un document
   */
  async archiveDocument(uuid: string, userId: number) {
    const document = await this.objectRepository.findByUuid(uuid)
    if (!document) {
      throw new Error('Document non trouvé')
    }

    if (!document.metadata) {
      throw new Error('Document sans métadonnées')
    }

    // Mise à jour du statut
    const updatedMetadata = {
      ...document.metadata,
      status: DocumentStatus.ARCHIVED,
      statusHistory: [
        ...(document.metadata.statusHistory || []),
        {
          status: DocumentStatus.ARCHIVED,
          timestamp: DateTime.now().toISO(),
          userId,
        },
      ],
    }

    const updatedDocument = await this.objectRepository.update(uuid, {
      metadata: updatedMetadata,
    })

    this.documents.set(uuid, updatedDocument)
    return updatedDocument
  }
}

test.group('Document Lifecycle', (group) => {
  let documentLifecycleService: MockDocumentLifecycleService
  let objectRepository: ObjectRepository
  let storageService: StorageService
  let testUser: User
  let reviewerUser: User
  let fakeDisk: ReturnType<typeof drive.fake>

  group.each.setup(async () => {
    fakeDisk = drive.fake()
    objectRepository = new ObjectRepository(ObjectModel)
    storageService = new StorageService(objectRepository, fakeDisk)
    documentLifecycleService = new MockDocumentLifecycleService(objectRepository, storageService)

    await db.beginGlobalTransaction()

    // Créer les utilisateurs de test
    testUser = await User.create({
      uuid: generateUuid(),
      fullName: 'Document Owner',
      email: generateUniqueEmail('owner'),
      password: 'password123',
    })

    reviewerUser = await User.create({
      uuid: generateUuid(),
      fullName: 'Document Reviewer',
      email: generateUniqueEmail('reviewer'),
      password: 'password123',
    })

    // Nous n'avons plus besoin de créer un cercle de test car il n'est pas utilisé
    /* await Circle.create({
      uuid: generateUuid(),
      name: 'Test Document Circle',
      description: 'Circle for document testing',
      userId: testUser.id,
    }) */
  })

  group.each.teardown(async () => {
    drive.restore()
    await db.rollbackGlobalTransaction()
  })

  test('should create a document with draft status', async ({ assert }) => {
    const document = await documentLifecycleService.createDocument(
      {
        uuid: generateUuid(),
        name: 'Test Document',
        description: 'A test document',
        mimeType: 'application/pdf',
        metadata: {
          author: 'Test User',
        },
      },
      testUser.id,
      1
    )

    assert.exists(document)
    assert.equal(document.metadata.status, DocumentStatus.DRAFT)
    assert.lengthOf(document.metadata.statusHistory, 1)
    assert.equal(document.metadata.statusHistory[0].status, DocumentStatus.DRAFT)
  })

  test('should submit a document for review', async ({ assert }) => {
    // Créer un document
    const document = await documentLifecycleService.createDocument(
      {
        uuid: generateUuid(),
        name: 'Document to Review',
        description: 'A document to be submitted for review',
        mimeType: 'application/pdf',
        metadata: {
          author: 'Test User',
        },
      },
      testUser.id,
      1
    )

    // Soumettre pour révision
    const submittedDoc = await documentLifecycleService.submitForReview(document.uuid, testUser.id)

    assert.equal(submittedDoc.metadata.status, DocumentStatus.PENDING_REVIEW)
    assert.lengthOf(submittedDoc.metadata.statusHistory, 2)
    assert.equal(submittedDoc.metadata.statusHistory[1].status, DocumentStatus.PENDING_REVIEW)
  })

  test('should not allow submitting non-draft documents for review', async ({ assert }) => {
    // Créer un document
    const document = await documentLifecycleService.createDocument(
      {
        uuid: generateUuid(),
        name: 'Already Submitted Doc',
        description: 'A document already submitted',
        mimeType: 'application/pdf',
      },
      testUser.id,
      1
    )

    // Soumettre pour révision une première fois
    await documentLifecycleService.submitForReview(document.uuid, testUser.id)

    // Tenter de soumettre à nouveau
    try {
      await documentLifecycleService.submitForReview(document.uuid, testUser.id)
      assert.fail('La soumission aurait dû échouer')
    } catch (error) {
      assert.equal(
        error.message,
        'Seuls les documents en brouillon peuvent être soumis pour révision'
      )
    }
  })

  test('should approve a document that is pending review', async ({ assert }) => {
    // Créer et soumettre un document
    const document = await documentLifecycleService.createDocument(
      {
        uuid: generateUuid(),
        name: 'Document for Approval',
        description: 'A document to be approved',
        mimeType: 'application/pdf',
      },
      testUser.id,
      1
    )

    await documentLifecycleService.submitForReview(document.uuid, testUser.id)

    // Approuver le document
    const approvalComment = 'Looks good, approved!'
    const approvedDoc = await documentLifecycleService.approveDocument(
      document.uuid,
      reviewerUser.id,
      approvalComment
    )

    assert.equal(approvedDoc.metadata.status, DocumentStatus.APPROVED)
    assert.lengthOf(approvedDoc.metadata.statusHistory, 3)
    assert.equal(approvedDoc.metadata.statusHistory[2].status, DocumentStatus.APPROVED)
    assert.equal(approvedDoc.metadata.statusHistory[2].userId, reviewerUser.id)
    assert.equal(approvedDoc.metadata.statusHistory[2].comment, approvalComment)

    // Vérifier que le commentaire est bien ajouté
    assert.lengthOf(approvedDoc.metadata.comments, 1)
    assert.equal(approvedDoc.metadata.comments[0].text, approvalComment)
    assert.equal(approvedDoc.metadata.comments[0].type, 'approval')
  })

  test('should reject a document with comments', async ({ assert }) => {
    // Créer et soumettre un document
    const document = await documentLifecycleService.createDocument(
      {
        uuid: generateUuid(),
        name: 'Document to Reject',
        description: 'A document that will be rejected',
        mimeType: 'application/pdf',
      },
      testUser.id,
      1
    )

    await documentLifecycleService.submitForReview(document.uuid, testUser.id)

    // Rejeter le document
    const rejectionReason = 'Document incomplet, veuillez ajouter plus de détails'
    const rejectedDoc = await documentLifecycleService.rejectDocument(
      document.uuid,
      reviewerUser.id,
      rejectionReason
    )

    assert.equal(rejectedDoc.metadata.status, DocumentStatus.REJECTED)
    assert.lengthOf(rejectedDoc.metadata.statusHistory, 3)
    assert.equal(rejectedDoc.metadata.statusHistory[2].status, DocumentStatus.REJECTED)
    assert.equal(rejectedDoc.metadata.statusHistory[2].reason, rejectionReason)

    // Vérifier que le commentaire de rejet est bien ajouté
    assert.lengthOf(rejectedDoc.metadata.comments, 1)
    assert.equal(rejectedDoc.metadata.comments[0].text, rejectionReason)
    assert.equal(rejectedDoc.metadata.comments[0].type, 'rejection')
  })

  test('should archive an approved document', async ({ assert }) => {
    // Créer, soumettre et approuver un document
    const document = await documentLifecycleService.createDocument(
      {
        uuid: generateUuid(),
        name: 'Document to Archive',
        description: 'A document that will be archived',
        mimeType: 'application/pdf',
      },
      testUser.id,
      1
    )

    await documentLifecycleService.submitForReview(document.uuid, testUser.id)
    await documentLifecycleService.approveDocument(document.uuid, reviewerUser.id)

    // Archiver le document
    const archivedDoc = await documentLifecycleService.archiveDocument(document.uuid, testUser.id)

    assert.equal(archivedDoc.metadata.status, DocumentStatus.ARCHIVED)
    assert.lengthOf(archivedDoc.metadata.statusHistory, 4)
    assert.equal(archivedDoc.metadata.statusHistory[3].status, DocumentStatus.ARCHIVED)
  })

  test('should retrieve complete status history of a document', async ({ assert }) => {
    // Créer un document et le faire passer par plusieurs états
    const document = await documentLifecycleService.createDocument(
      {
        uuid: generateUuid(),
        name: 'Document with History',
        description: 'A document with a complete lifecycle history',
        mimeType: 'application/pdf',
      },
      testUser.id,
      1
    )

    // Vérifier l'état initial
    let history = await documentLifecycleService.getStatusHistory(document.uuid)
    assert.lengthOf(history, 1)
    assert.equal(history[0].status, DocumentStatus.DRAFT)

    // Soumettre pour révision
    await documentLifecycleService.submitForReview(document.uuid, testUser.id)

    // Vérifier après soumission
    history = await documentLifecycleService.getStatusHistory(document.uuid)
    assert.lengthOf(history, 2)
    assert.equal(history[1].status, DocumentStatus.PENDING_REVIEW)

    // Rejeter le document
    await documentLifecycleService.rejectDocument(document.uuid, reviewerUser.id, 'Needs revision')

    // Vérifier après rejet
    history = await documentLifecycleService.getStatusHistory(document.uuid)
    assert.lengthOf(history, 3)
    assert.equal(history[2].status, DocumentStatus.REJECTED)

    // Simuler une nouvelle soumission après rejet
    const updatedDoc = await documentLifecycleService
      .getObjectRepository()
      .findByUuid(document.uuid)
    if (!updatedDoc) {
      throw new Error('Document non trouvé')
    }

    updatedDoc.metadata.status = DocumentStatus.PENDING_REVIEW
    updatedDoc.metadata.statusHistory.push({
      status: DocumentStatus.PENDING_REVIEW,
      timestamp: DateTime.now().toISO(),
      userId: testUser.id,
    })

    await objectRepository.update(updatedDoc.uuid, { metadata: updatedDoc.metadata })

    // Approuver le document
    await documentLifecycleService.approveDocument(updatedDoc.uuid, reviewerUser.id)

    // Récupérer l'historique complet final
    history = await documentLifecycleService.getStatusHistory(updatedDoc.uuid)

    // Vérifier l'historique complet
    assert.lengthOf(history, 5) // DRAFT, PENDING_REVIEW, REJECTED, PENDING_REVIEW (re-soumission), APPROVED
    assert.equal(history[0].status, DocumentStatus.DRAFT)
    assert.equal(history[1].status, DocumentStatus.PENDING_REVIEW)
    assert.equal(history[2].status, DocumentStatus.REJECTED)
    assert.equal(history[3].status, DocumentStatus.PENDING_REVIEW)
    assert.equal(history[4].status, DocumentStatus.APPROVED)
  })
})
