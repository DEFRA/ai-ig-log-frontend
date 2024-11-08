const tokenCosts = {
  'chatgpt-4': 0.03,
  'chatgpt-40': 0.005,
  'gpt-3.5-turbo': 0.0005
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', { hour12: false })
}

function calculateTotalLatency(threads) {
  return threads.reduce((totalLatency, thread) => {
    const latencyInMilliseconds =
      new Date(thread.endTime) - new Date(thread.startTime)
    return totalLatency + latencyInMilliseconds
  }, 0)
}

function calculateOverallModelUsage(threads) {
  const overallModelUsage = {}

  threads.forEach((thread) => {
    const modelUsage = {}
    thread.steps.forEach((step) => {
      const modelName = step.modelName
      const totalTokens = step.inputTokens + step.outputTokens

      if (!overallModelUsage[modelName]) {
        overallModelUsage[modelName] = {
          totalTokens: 0,
          cost: 0
        }
      }

      if (!modelUsage[modelName]) {
        modelUsage[modelName] = {
          totalTokens: 0,
          cost: 0
        }
      }

      modelUsage[modelName].totalTokens += totalTokens
      modelUsage[modelName].cost += totalTokens * tokenCosts[modelName]

      overallModelUsage[modelName].totalTokens += totalTokens
      overallModelUsage[modelName].cost += totalTokens * tokenCosts[modelName]
    })
    thread.modelUsage = Object.keys(modelUsage).map((modelName) => ({
      model_name: modelName,
      totalTokens: modelUsage[modelName].totalTokens,
      cost: (modelUsage[modelName].cost / 100).toFixed(4)
    }))
  })

  return Object.keys(overallModelUsage).map((modelName) => ({
    model_name: modelName,
    totalTokens: overallModelUsage[modelName].totalTokens,
    cost: (overallModelUsage[modelName].cost / 100).toFixed(4)
  }))
}

function transformSessionData(sessionData) {
  const numberOfThreads = sessionData.threads.length
  const overallModelUsage = calculateOverallModelUsage(sessionData.threads)
  const threads = sessionData.threads.map((thread) => {
    const numberOfSteps = thread.steps.length
    const latencyInMilliseconds =
      new Date(thread.endTime) - new Date(thread.startTime)
    return {
      threadId: thread.id,
      sort_time: new Date(thread.startTime),
      start_time: formatDate(thread.startTime),
      end_time: formatDate(thread.endTime),
      input: thread.input,
      output: thread.output,
      numberOfSteps,
      overallModelUsage,
      modelUsage: thread.modelUsage,
      latencyInMilliseconds
    }
  })

  threads.sort((a, b) => b.sort_time - a.sort_time)
  const overallModelUsageArray = calculateOverallModelUsage(sessionData.threads)
  const totalLatencyInMilliseconds = calculateTotalLatency(sessionData.threads)

  return {
    sessionId: sessionData.sessionId,
    projectId: sessionData.projectId,
    user: sessionData.user,
    sort_time: new Date(sessionData.startTime),
    start_time: formatDate(sessionData.startTime),
    end_time: formatDate(sessionData.endTime),
    numberOfThreads,
    threads,
    overallModelUsage: overallModelUsageArray,
    totalLatencyInMilliseconds
  }
}

function transformSessionsData(sessionData) {
  const transformedSessions = sessionData.map((session) => {
    return transformSessionData(session)
  })

  return transformedSessions.sort((a, b) => b.sort_time - a.sort_time)
}

export { transformSessionsData, transformSessionData }
