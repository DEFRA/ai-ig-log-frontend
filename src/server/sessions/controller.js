import Joi from 'joi'
import { getSessions } from '~/src/server/sessions/helpers/fetch/get-sessions.js'
import { transformSessionsData } from '~/src/server/common/helpers/transform/transform-session-data.js'

export const sessionsController = {
  options: {
    validate: {
      params: Joi.object({
        projectId: Joi.string().required()
      })
    }
  },
  async handler(request, h) {
    const sessionsData = await getSessions(request.params.projectId)
    const sessions = transformSessionsData(sessionsData.sessions)
    return h.view('sessions/index', {
      pageTitle: 'Sessions',
      heading: 'Sessions',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Sessions'
        }
      ],
      sessions
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
