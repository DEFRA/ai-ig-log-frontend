import auth from '~/src/server/auth/helpers/index.js'

export const logoutController = {
  async handler(request, h) {
    request.auth?.credentials?.account &&
      (await auth.logout(request.auth.credentials.account))
    request.cookieAuth.clear()
    return h.redirect('/login')
  }
}
