import { fetcher } from '~/src/server/common/helpers/fetch/index.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function getProjects() {
  logger.info('Fetching projects data from IG Log API')

  const projectsEndpoint = `${config.get('igLogApiEndpoint')}/projects`
  logger.info(`projectsEndpoint': ${projectsEndpoint}`)

  const result = await fetcher(projectsEndpoint)

  if (!result?.json) {
    logger.error('Failed to fetch projects data or invalid response structure')
    throw new Error('Failed to fetch projects data')
  }

  return result.json
}

export { getProjects }
