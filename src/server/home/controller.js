import {
  getProjects,
  getDashboard
} from '~/src/server/home/helpers/fetch/index.js'

export const homeController = {
  async handler(request, h) {
    const projectsData = await getProjects()

    if (!projectsData?.projects) {
      return h.response('projects data not found').code(404)
    }

    const project = projectsData.projects[0]
    const dashboard = await getDashboard(project.id)
    return h.view('home/index', {
      pageTitle: 'Home',
      heading: project.name,
      project,
      projects: projectsData.projects,
      dashboard
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
