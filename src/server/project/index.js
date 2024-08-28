import {
  projectControllerGet,
  projectControllerPost
} from '~/src/server/project/controller.js'

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
