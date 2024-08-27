import { sessionsController } from '~/src/server/sessions/controller.js'

/**
 * Sets up the routes used in the /about page.
 * These routes are registered in src/server/router.js.
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const sessions = {
  plugin: {
    name: 'sessions',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/project/{projectId}/sessions',
          ...sessionsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
