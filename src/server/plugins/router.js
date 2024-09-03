import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { sessions } from '~/src/server/sessions/index.js'
import { threads } from '~/src/server/threads/index.js'
import { steps } from '~/src/server/steps/index.js'
import { project } from '~/src/server/project/index.js'
import { data } from '~/src/server/data/index.js'
import { auth } from '~/src/server/auth/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([
        auth,
        home,
        sessions,
        threads,
        steps,
        project,
        data
      ])

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
