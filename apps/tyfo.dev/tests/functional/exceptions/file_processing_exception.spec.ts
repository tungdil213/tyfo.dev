import { test } from '@japa/runner'
import FileProcessingException from '#exceptions/file_processing_exception'
import sinon from 'sinon'
import { HttpContext } from '@adonisjs/core/http'

test.group('FileProcessingException', (group) => {
  let sandbox: sinon.SinonSandbox

  group.each.setup(() => {
    sandbox = sinon.createSandbox()
  })

  group.each.teardown(() => {
    sandbox.restore()
  })
  test('should have correct static status value', ({ assert }) => {
    assert.equal(FileProcessingException.status, 500)
  })

  test('should create an instance with message', ({ assert }) => {
    const message = 'Error processing file'
    const exception = new FileProcessingException(message)

    assert.equal(exception.message, message)
  })

  test('should handle error response with custom message', async ({ assert }) => {
    const message = 'File processing failed'
    const exception = new FileProcessingException(message)

    // Mock HttpContext
    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(500))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message,
          code: 'E_FILE_PROCESSING',
        },
      })
    )
  })

  test('should handle error response with default message when message is not provided', async ({
    assert,
  }) => {
    // Create exception without message
    const exception = new FileProcessingException()
    exception.message = '' // explicitly set to empty to test default message path

    // Mock HttpContext
    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(500))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message: 'Une erreur est survenue lors du traitement du fichier',
          code: 'E_FILE_PROCESSING',
        },
      })
    )
  })

  test('should use provided status when available', async ({ assert }) => {
    const message = 'File processing failed with custom status'
    const exception = new FileProcessingException(message)
    exception.status = 507 // Insufficient Storage

    // Mock HttpContext
    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const mockCtx = {
      response: mockResponse,
    } as unknown as HttpContext

    await exception.handle(exception, mockCtx)

    assert.isTrue(mockResponse.status.calledOnceWith(507))
    assert.isTrue(
      mockResponse.json.calledOnceWith({
        error: {
          message,
          code: 'E_FILE_PROCESSING',
        },
      })
    )
  })
})
