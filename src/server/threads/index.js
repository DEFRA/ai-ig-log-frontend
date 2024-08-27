import { threadsController } from '~/src/server/threads/controller.js'

/**
 * Sets up the routes used in the /about page.
 * These routes are registered in src/server/router.js.
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const threads = {
  plugin: {
    name: 'threads',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/projects/{projectId}/sessions/{sessionId}',
          ...threadsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
