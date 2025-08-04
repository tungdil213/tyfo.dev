import { test } from '@japa/runner'
import sinon from 'sinon'
import { HttpContext } from '@adonisjs/core/http'
import BaseException from '#exceptions/base_exception'

test.group('BaseException', (group) => {
  let sandbox: sinon.SinonSandbox

  group.each.setup(() => {
    sandbox = sinon.createSandbox()
  })

  group.each.teardown(() => {
    sandbox.restore()
  })
  test('should create an instance with default values', ({ assert }) => {
    const message = 'Test error message'
    const exception = new BaseException(message)

    assert.equal(exception.message, message)
    assert.equal(exception.code, 'E_UNKNOWN_ERROR')
    assert.equal(exception.status, 500)
    assert.isUndefined(exception.context)
  })

  test('should create an instance with custom values', ({ assert }) => {
    const message = 'Custom error message'
    const code = 'E_CUSTOM_ERROR'
    const status = 418
    const context = { foo: 'bar' }

    const exception = new BaseException(message, code, status, context)

    assert.equal(exception.message, message)
    assert.equal(exception.code, code)
    assert.equal(exception.status, status)
    assert.deepEqual(exception.context, context)
  })

  test('should handle error response correctly', async ({ assert }) => {
    const message = 'API error'
    const code = 'E_API_ERROR'
    const status = 400

    const exception = new BaseException(message, code, status)

    // Mock HttpContext
    const mockResponse = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(status))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message,
          code,
        },
      })
    )
  })

  test('should sanitize sensitive data in context', ({ assert }) => {
    const message = 'Security error'
    const sensitiveContext = {
      username: 'user123',
      password: 'secret123',
      apiKey: '1234567890',
      token: 'abc123',
      secret: 'super-secret',
      data: {
        regularField: 'visible',
      },
    }

    const exception = new BaseException(message, 'E_SECURITY', 403, sensitiveContext)

    // Accessing private method for testing - we have to use any type to bypass TypeScript restrictions
    // In a real application, we might want to expose this method as protected for easier testing
    const sanitizedJson = (exception as any).sanitizeContext(sensitiveContext)
    const parsed = JSON.parse(sanitizedJson)

    assert.equal(parsed.username, 'user123')
    assert.equal(parsed.password, '[REDACTED]')
    assert.equal(parsed.apiKey, '[REDACTED]')
    assert.equal(parsed.token, '[REDACTED]')
    assert.equal(parsed.secret, '[REDACTED]')
    assert.equal(parsed.data.regularField, 'visible')
  })
})
