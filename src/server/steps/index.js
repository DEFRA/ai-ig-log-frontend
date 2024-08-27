import { stepsController } from '~/src/server/steps/controller.js'

/**
 * Sets up the routes used in the /about page.
 * These routes are registered in src/server/router.js.
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const steps = {
  plugin: {
    name: 'steps',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/projects/{projectId}/sessions/{sessionId}/threads/{threadId}',
          ...stepsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
