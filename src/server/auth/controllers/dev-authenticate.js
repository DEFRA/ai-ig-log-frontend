import { log } from 'console'
import auth from '~/src/server/auth/helpers/index.js'

export const devAuthController = {
  options: {
    auth: false
  },
  async handler(request, h) {
    try {
      await auth.authenticate(undefined, request.cookieAuth)
    } catch (error) {
      log('Error authenticating', error)
    }
    return h.redirect('/')
  }
}
