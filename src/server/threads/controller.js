import Joi from 'joi'
import { getThreads } from '~/src/server/threads/helpers/fetch/get-threads.js'
import { transformSessionData } from '~/src/server/common/helpers/transform/transform-session-data.js'

export const threadsController = {
  options: {
    validate: {
      params: Joi.object({
        projectId: Joi.string().required(),
        sessionId: Joi.string().required()
      })
    }
  },
  async handler(request, h) {
    const threadsData = await getThreads(request.params.sessionId)
    const threads = transformSessionData(threadsData.session)
    return h.view('threads/index', {
      pageTitle: 'Session - Threads',
      heading: 'Session - Threads',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Sessions',
          href: `/project/${request.params.projectId}/sessions`
        },
        {
          text: 'Threads'
        }
      ],
      threads
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
