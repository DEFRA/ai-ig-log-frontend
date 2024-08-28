import { createSession } from '~/src/server/data/helpers/create-session.js'
import { generateSyntheticData } from '~/src/server/data/helpers/generate-synthetic-data.js'

export const dataController = {
  async handler(request, h) {
    const projectId = request.params.projectId
    const syntheticData = generateSyntheticData(
      projectId,
      5,
      new Date('2024-08-01'),
      new Date('2024-08-05')
    )
    await createSession(syntheticData.sessions)
    return h.redirect('/')
  }
}
