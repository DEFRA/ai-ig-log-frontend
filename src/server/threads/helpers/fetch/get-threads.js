import { fetcher } from '~/src/server/common/helpers/fetch/index.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function getThreads(sessionId) {
  logger.info('Fetching threads data from IG Log API')

  const threadsEndpoint = `${config.get('igLogApiEndpoint')}/sessions/${sessionId}`

  const result = await fetcher(threadsEndpoint)

  if (!result?.json) {
    logger.error('Failed to fetch threads data or invalid response structure')
    throw new Error('Failed to fetch threeads data')
  }

  return result.json
}

export { getThreads }
