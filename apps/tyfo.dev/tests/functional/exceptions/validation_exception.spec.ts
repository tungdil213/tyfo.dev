import { test } from '@japa/runner'
import ValidationException from '#exceptions/validation_exception'
import sinon from 'sinon'
import { HttpContext } from '@adonisjs/core/http'

test.group('ValidationException', (group) => {
  let sandbox: sinon.SinonSandbox

  group.each.setup(() => {
    sandbox = sinon.createSandbox()
  })

  group.each.teardown(() => {
    sandbox.restore()
  })
  test('should create an instance with correct default values', ({ assert }) => {
    const message = 'Validation failed'
    const exception = new ValidationException(message)

    assert.equal(exception.message, message)
    assert.equal(exception.code, 'E_VALIDATION')
    assert.equal(exception.status, 400)
    assert.isUndefined(exception.context)
  })

  test('should create an instance with context', ({ assert }) => {
    const message = 'Form validation failed'
    const context = {
      fields: {
        email: 'Email invalide',
        password: 'Mot de passe trop court',
      },
    }

    const exception = new ValidationException(message, context)

    assert.equal(exception.message, message)
    assert.equal(exception.code, 'E_VALIDATION')
    assert.equal(exception.status, 400)
    assert.deepEqual(exception.context, context)
  })

  test('should handle error response correctly', async ({ assert }) => {
    const message = 'Invalid input data'
    const context = { field: 'email', error: 'format invalide' }
    const exception = new ValidationException(message, context)

    // Mock HttpContext
    const mockResponse = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(400))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message,
          code: 'E_VALIDATION',
        },
      })
    )
  })
})
