import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid'
import { createProject } from '~/src/server/project/helpers/create-project.js'

const projectControllerGet = {
  handler: (request, h) => {
    const name = request.yar.get('name')
    return h.view('project/index', { name })
  }
}

const projectControllerPost = {
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).max(30)
      }),
      failAction: (request, h, error) => {
        return h
          .view('project/index', {
            name: request.payload.name,
            errorMessage: {
              text: error.details[0].message
            }
          })
          .takeover()
      }
    }
  },
  async handler(request, h) {
    const project = {
      id: uuidv4(),
      name: request.payload.name
    }

    await createProject(project)

    return h.redirect('/')
  }
}

export { projectControllerGet, projectControllerPost }
