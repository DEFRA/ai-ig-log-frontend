import { healthController } from '~/src/server/health/controller.js'

describe('healthController', () => {
  it('should return a success message with status code 200', () => {
    const request = {}
    const h = {
      response: jest.fn().mockReturnThis(),
      code: jest.fn()
    }

    healthController.handler(request, h)

    expect(h.response).toHaveBeenCalledWith({ message: 'success' })
    expect(h.code).toHaveBeenCalledWith(200)
  })
})
