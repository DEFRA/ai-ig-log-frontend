import { devAuthController } from '~/src/server/auth/controllers/dev-authenticate.js'
import { authController } from '~/src/server/auth/controllers/authenticate.js'
import { loginController } from '~/src/server/auth/controllers/login.js'
import { logoutController } from '~/src/server/auth/controllers/logout.js'

export const auth = {
  plugin: {
    name: 'login',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/dev-auth',
          ...devAuthController
        },
        {
          method: 'GET',
          path: '/authenticate',
          ...authController
        },
        {
          method: 'GET',
          path: '/login',
          ...loginController
        },
        {
          method: 'GET',
          path: '/logout',
          ...logoutController
        }
      ])
    }
  }
}
