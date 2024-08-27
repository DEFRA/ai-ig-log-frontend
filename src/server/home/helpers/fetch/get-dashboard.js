import { proxyFetch } from '~/src/server/common/helpers/proxy-fetch.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function getDashboard(projectId) {
  logger.info('Fetching dashboard data from IG Log API')

  const dashboardEndpoint = `${config.get('igLogApiEndpoint')}/projects/${projectId}/dashboard`

  logger.info(dashboardEndpoint)

  const response = await proxyFetch(dashboardEndpoint).catch((err) => {
    logger.info(`err ${err.message}`)
  })

  return response.json()
}

export { getDashboard }
