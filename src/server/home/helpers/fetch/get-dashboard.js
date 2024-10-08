import { fetcher } from '~/src/server/common/helpers/fetch/index.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

const getDashboard = async (projectId) => {
  logger.info('Fetching dashboard data from IG Log API')

  const dashboardEndpoint = `${config.get('igLogApiEndpoint')}/projects/${projectId}/dashboard`
  logger.info(`projectsEndpoint': ${dashboardEndpoint}`)

  const result = await fetcher(dashboardEndpoint)

  if (!result?.json) {
    logger.error('Failed to fetch dashboard data or invalid response structure')
    throw new Error('Failed to fetch dasboard data')
  }

  return result.json
}

export { getDashboard }
