import { sessionsController } from '~/src/server/sessions/controller.js'

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
