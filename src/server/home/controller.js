import {
  getProjects,
  getDashboard
} from '~/src/server/home/helpers/fetch/index.js'

export const homeController = {
  async handler(request, h) {
    const projects = await getProjects()
    const project = projects.projects[0]
    const dashboard = await getDashboard(project.id)

    return h.view('home/index', {
      pageTitle: 'Home',
      heading: project.name,
      project,
      projects,
      dashboard
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
