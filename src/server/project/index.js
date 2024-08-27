import {
  projectControllerGet,
  projectControllerPost
} from '~/src/server/project/controller.js'

/**
 * Sets up the routes used in the /about page.
 * These routes are registered in src/server/router.js.
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const project = {
  plugin: {
    name: 'project',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/project',
          ...projectControllerGet
        },
        {
          method: 'POST',
          path: '/project',
          ...projectControllerPost
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
