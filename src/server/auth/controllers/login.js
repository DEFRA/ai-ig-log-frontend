import auth from '~/src/server/auth/helpers/index.js'

export const loginController = {
  options: {
    auth: false
  },
  async handler(request, h) {
    const authUrl = await auth.getAuthenticationUrl()
    return h.redirect(authUrl)
  }
}
