import { threadsController } from '~/src/server/threads/controller.js'

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
