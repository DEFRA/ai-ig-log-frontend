import { dataController } from '~/src/server/data/controller.js'

export const data = {
  plugin: {
    name: 'data',
    register(server) {
      server.route([
        {
          method: 'POST',
          path: '/data/generate/{projectId}',
          ...dataController
        }
      ])
    }
  }
}
