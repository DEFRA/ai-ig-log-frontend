import { proxyFetch } from '~/src/server/common/helpers/proxy-fetch.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function getThreads(sessionId) {
  logger.info('Fetching threads data from IG Log API')

  const projectsEndpoint = `${config.get('igLogApiEndpoint')}/sessions/${sessionId}`

  logger.info(projectsEndpoint)

  const response = await proxyFetch(projectsEndpoint).catch((err) => {
    logger.info(`err ${err.message}`)
  })

  return response.json()
}

export { getThreads }