import { getSessions } from '~/src/server/sessions/helpers/fetch/get-sessions.js'
import { transformSessionsData } from '~/src/server/common/helpers/transform/transform-session-data.js'

const provideSessions = {
  method: async (request) => {
    const { sessions } = (await getSessions(request.params.projectId)) ?? {}
    if (sessions) {
      return transformSessionsData(sessions)
    }

    return null
  },
  assign: 'sessions'
}

export { provideSessions }
