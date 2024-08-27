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
    const stepsData = await getSteps(
      request.params.sessionId,
      request.params.threadId
    )

    if (!stepsData?.thread) {
      return h.response('Thread data not found').code(404)
    }

    const steps = stepsData.thread

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
      steps
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
