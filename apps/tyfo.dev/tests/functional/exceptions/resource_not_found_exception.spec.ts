import { test } from '@japa/runner'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import sinon from 'sinon'
import { HttpContext } from '@adonisjs/core/http'

test.group('ResourceNotFoundException', () => {
  test('should create an instance with string identifier', ({ assert }) => {
    const resourceType = 'User'
    const identifier = 'abc123'

    const exception = new ResourceNotFoundException(resourceType, identifier)

    assert.equal(
      exception.message,
      `La ressource ${resourceType} avec l'identifiant ${identifier} n'a pas été trouvée`
    )
    assert.equal(exception.code, 'E_RESOURCE_NOT_FOUND')
    assert.equal(exception.status, 404)
    assert.deepEqual(exception.context, { resourceType, identifier })
  })

  test('should create an instance with numeric identifier', ({ assert }) => {
    const resourceType = 'Document'
    const identifier = 42

    const exception = new ResourceNotFoundException(resourceType, identifier)

    assert.equal(
      exception.message,
      `La ressource ${resourceType} avec l'identifiant ${identifier} n'a pas été trouvée`
    )
    assert.equal(exception.code, 'E_RESOURCE_NOT_FOUND')
    assert.equal(exception.status, 404)
    assert.deepEqual(exception.context, { resourceType, identifier })
  })

  test('should create an instance with additional context', ({ assert }) => {
    const resourceType = 'File'
    const identifier = 'file-123'
    const additionalContext = {
      path: '/documents/reports',
      attempted: 'read',
    }

    const exception = new ResourceNotFoundException(resourceType, identifier, additionalContext)

    assert.equal(
      exception.message,
      `La ressource ${resourceType} avec l'identifiant ${identifier} n'a pas été trouvée`
    )
    assert.equal(exception.code, 'E_RESOURCE_NOT_FOUND')
    assert.equal(exception.status, 404)
    assert.deepEqual(exception.context, {
      resourceType,
      identifier,
      path: additionalContext.path,
      attempted: additionalContext.attempted,
    })
  })

  test('should handle error response correctly', async ({ assert }) => {
    const resourceType = 'Circle'
    const identifier = 'circle-456'
    const exception = new ResourceNotFoundException(resourceType, identifier)

    // Mock HttpContext
    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(404))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message: exception.message,
          code: 'E_RESOURCE_NOT_FOUND',
        },
      })
    )
  })
})
