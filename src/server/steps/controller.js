import { log } from 'console'
import Joi from 'joi'
import { getSteps } from '~/src/server/steps/helpers/fetch/get-steps.js'

export const stepsController = {
  options: {
    validate: {
      params: Joi.object({
        projectId: Joi.string().required(),
        sessionId: Joi.string().required(),
        threadId: Joi.string().required()
      })
    }
  },
  async handler(request, h) {
    const steps = await getSteps(
      request.params.sessionId,
      request.params.threadId
    )
    log('steps', steps.thread)
    return h.view('steps/index', {
      pageTitle: 'Session - Threads - Steps',
      heading: 'Session - Threads - Steps',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Sessions',
          href: `/project/${request.params.projectId}/sessions/${request.params.sessionId}/threads/${request.params.threadId}`
        },
        {
          text: 'Threads',
          href: `/projects/${request.params.projectId}/sessions/${request.params.sessionId}`
        },
        {
          text: 'Steps'
        }
      ],
      steps: steps.thread
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
