import auth from '~/src/server/auth/helpers/index.js'

export const authController = {
  options: {
    auth: { mode: 'try' }
  },
  async handler(request, h) {
    await auth.authenticate(request.query.code, request.cookieAuth)
    return h.redirect('/')
  }
}
