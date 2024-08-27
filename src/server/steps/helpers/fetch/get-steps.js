import { fetcher } from '~/src/server/common/helpers/fetch/index.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
const logger = createLogger()

async function getSteps(sessionId, threadId) {
  logger.info('Fetching steps data from IG Log API')

  const stepsEndpoint = `${config.get('igLogApiEndpoint')}/sessions/${sessionId}/threads/${threadId}`

  const result = await fetcher(stepsEndpoint)

  if (!result?.json) {
    logger.error('Failed to fetch steps data or invalid response structure')
    throw new Error('Failed to fetch steps data')
  }

  return result.json
}

export { getSteps }
