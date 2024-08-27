import { fetcher } from '~/src/server/common/helpers/fetch/index.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function createSession(sessions) {
  logger.info('Create session data for IG Log API')

  const projectEndpoint = `${config.get('igLogApiEndpoint')}/sessions`
  logger.info(`projectsEndpoint': ${projectEndpoint}`)

  for (const session of sessions) {
    const result = await fetcher(projectEndpoint, {
      method: 'post',
      body: JSON.stringify(session)
    })

    if (!result?.json) {
      logger.error(
        'Failed to create project data or invalid response structure'
      )
      throw new Error('Failed to create project data')
    }
  }

  return sessions.length
}

export { createSession }
