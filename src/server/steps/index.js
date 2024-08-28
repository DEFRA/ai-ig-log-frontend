import { stepsController } from '~/src/server/steps/controller.js'

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
