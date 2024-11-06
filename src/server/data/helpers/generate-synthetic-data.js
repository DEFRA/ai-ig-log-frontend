import { v4 as uuidv4 } from 'uuid'

const models = {
  'chatgpt-4': 0.03,
  'chatgpt-40': 0.005,
  'gpt-3.5-turbo': 0.0005
}

const getRandomModel = () => {
  const keys = Object.keys(models)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return randomKey
}

const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const generateSyntheticData = (projectId, numSessions, startDate, endDate) => {
  const data = {
    sessions: []
  }

  for (let i = 0; i < numSessions; i++) {
    const sessionId = uuidv4()
    const sessionStart = generateRandomDate(startDate, endDate)
    const sessionEnd = generateRandomDate(sessionStart, endDate)

    const session = {
      endTime: sessionEnd.toISOString(),
      id: sessionId,
      projectId,
      startTime: sessionStart.toISOString(),
      threads: [],
      user: `user${i}@test.com`
    }

    const numThreads = Math.floor(Math.random() * 5) + 1

    for (let j = 0; j < numThreads; j++) {
      const threadId = uuidv4()
      const threadStart = generateRandomDate(sessionStart, sessionEnd)
      const threadEnd = generateRandomDate(threadStart, sessionEnd)

      const thread = {
        id: threadId,
        name: sessionId,
        startTime: threadStart.toISOString(),
        input: 'What is SFI?',
        output:
          'SFI stands for Sustainable Farming Incentive. It is a scheme aimed at getting large numbers of farmers to make sustainable changes to the way they farm, with the cumulative effect of this producing large-scale environmental benefits.',
        steps: [],
        endTime: threadEnd.toISOString()
      }

      const numSteps = Math.floor(Math.random() * 10) + 1

      const modelName = getRandomModel()

      for (let k = 0; k < numSteps; k++) {
        const stepId = uuidv4()
        const stepStart = generateRandomDate(threadStart, threadEnd)
        const stepEnd = generateRandomDate(stepStart, threadEnd)

        const step = {
          id: stepId,
          name: stepId,
          type: 'llm-start',
          modelName,
          modelMetadata: {
            model: modelName,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            n: 1,
            stream: false
          },
          input:
            'System: You are an assistant who helps with questions and supplies the answer.',
          startTime: stepStart.toISOString(),
          endTime: stepEnd.toISOString(),
          inputTokens: Math.floor(Math.random() * 1000), // Random token count
          outputTokens: Math.floor(Math.random() * 50) // Random token count
        }

        thread.steps.push(step)
      }

      session.threads.push(thread)
    }

    data.sessions.push(session)
  }

  return data
}

export { generateSyntheticData }
