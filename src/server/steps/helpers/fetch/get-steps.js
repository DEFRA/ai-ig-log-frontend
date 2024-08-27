import { proxyFetch } from '~/src/server/common/helpers/proxy-fetch.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function getSteps(sessionId, threadId) {
  logger.info('Fetching steps data from IG Log API')

  const projectsEndpoint = `${config.get('igLogApiEndpoint')}/sessions/${sessionId}/threads/${threadId}`

  logger.info(projectsEndpoint)

  const response = await proxyFetch(projectsEndpoint).catch((err) => {
    logger.info(`err ${err.message}`)
  })

  return response.json()
}

export { getSteps }
