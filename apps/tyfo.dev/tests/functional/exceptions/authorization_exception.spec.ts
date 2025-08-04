import { test } from '@japa/runner'
import AuthorizationException from '#exceptions/authorization_exception'
import sinon from 'sinon'
import { HttpContext } from '@adonisjs/core/http'

test.group('AuthorizationException', (group) => {
  let sandbox: sinon.SinonSandbox

  group.each.setup(() => {
    sandbox = sinon.createSandbox()
  })

  group.each.teardown(() => {
    sandbox.restore()
  })
  test('should create an instance with correct default values', ({ assert }) => {
    const message = 'Unauthorized access'
    const exception = new AuthorizationException(message)

    assert.equal(exception.message, message)
    assert.equal(exception.code, 'E_AUTHORIZATION')
    assert.equal(exception.status, 403)
    assert.isUndefined(exception.context)
  })

  test('should create an instance with context', ({ assert }) => {
    const message = 'Permission denied'
    const context = {
      resource: 'document',
      action: 'edit',
      userId: '123',
    }

    const exception = new AuthorizationException(message, context)

    assert.equal(exception.message, message)
    assert.equal(exception.code, 'E_AUTHORIZATION')
    assert.equal(exception.status, 403)
    assert.deepEqual(exception.context, context)
  })

  test('should handle error response correctly', async ({ assert }) => {
    const message = 'Access forbidden'
    const exception = new AuthorizationException(message)

    // Mock HttpContext
    const mockResponse = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(403))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message,
          code: 'E_AUTHORIZATION',
        },
      })
    )
  })
})
