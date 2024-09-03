import { config } from '~/src/config/index.js'
import authCookie from '@hapi/cookie'
import auth from '~/src/server/auth/helpers/index.js'

const authConfig = config.get('auth')

export const authentication = {
  plugin: {
    name: 'auth',
    register: async (server) => {
      await server.register(authCookie)

      server.auth.strategy('session-auth', 'cookie', {
        cookie: {
          name: 'session-auth',
          password: authConfig.cookie.password,
          ttl: authConfig.cookie.ttl,
          path: '/',
          isSecure: config.isProduction,
          isSameSite: 'Lax' // Needed for the post authentication redirect
        },
        keepAlive: true, // Resets the cookie ttl after each route
        redirectTo: '/login'
      })

      server.auth.default('session-auth')

      server.ext('onPreAuth', async (request, h) => {
        if (request.auth.credentials) {
          await auth.refresh(
            request.auth.credentials.account,
            request.cookieAuth
          )
        }
        return h.continue
      })
    }
  }
}
