import { fetcher } from '~/src/server/common/helpers/fetch/index.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function createProject(project) {
  logger.info('Create project data for IG Log API')

  const projectEndpoint = `${config.get('igLogApiEndpoint')}/projects`
  logger.info(`projectsEndpoint': ${projectEndpoint}`)

  const result = await fetcher(projectEndpoint, {
    method: 'post',
    body: JSON.stringify(project)
  })

  if (!result?.json) {
    logger.error('Failed to create project data or invalid response structure')
    throw new Error('Failed to create project data')
  }

  return result.json
}

export { createProject }
