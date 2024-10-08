import { fetcher } from '~/src/server/common/helpers/fetch/index.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

const getSessions = async (projectId) => {
  logger.info('Fetching sessions data from IG Log API')

  const projectsEndpoint = `${config.get('igLogApiEndpoint')}/projects/${projectId}/sessions`
  logger.info(`projectsEndpoint': ${projectsEndpoint}`)

  const result = await fetcher(projectsEndpoint)

  if (!result?.json) {
    logger.error('Failed to fetch sessions data or invalid response structure')
    throw new Error('Failed to fetch sessions data')
  }

  return result.json
}

export { getSessions }
