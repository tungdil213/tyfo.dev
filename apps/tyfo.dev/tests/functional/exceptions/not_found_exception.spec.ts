import { test } from '@japa/runner'
import NotFoundException from '#exceptions/not_found_exception'
import sinon from 'sinon'
import { HttpContext } from '@adonisjs/core/http'

test.group('NotFoundException', (group) => {
  let sandbox: sinon.SinonSandbox

  group.each.setup(() => {
    sandbox = sinon.createSandbox()
  })

  group.each.teardown(() => {
    sandbox.restore()
  })

  test('should have correct static status value', ({ assert }) => {
    assert.equal(NotFoundException.status, 404)
  })

  test('should create an instance with message', ({ assert }) => {
    const message = 'Resource not found'
    const exception = new NotFoundException(message)

    assert.equal(exception.message, message)
    assert.equal(exception.status, 404) // status comes from Exception class
  })

  test('should handle error response with custom message', async ({ assert }) => {
    const message = 'Custom not found message'
    const exception = new NotFoundException(message)

    // Mock HttpContext
    const mockResponse = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(404))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message,
          code: 'E_NOT_FOUND',
        },
      })
    )
  })

  test('should handle error response with default message when message is not provided', async ({
    assert,
  }) => {
    // Create exception without message
    const exception = new NotFoundException()
    exception.message = '' // explicitly set to empty to test default message path

    // Mock HttpContext
    const mockResponse = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(404))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message: 'Une erreur est survenue lors du traitement du fichier',
          code: 'E_NOT_FOUND',
        },
      })
    )
  })

  test('should use provided status when available', async ({ assert }) => {
    const message = 'Resource not found'
    const exception = new NotFoundException(message)
    exception.status = 410 // Gone - custom status

    // Mock HttpContext
    const mockResponse = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(410))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message,
          code: 'E_NOT_FOUND',
        },
      })
    )
  })
})
