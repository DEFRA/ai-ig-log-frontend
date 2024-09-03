import isInRole from '~/src/server/auth/helpers/is-in-role.js'
import admin from '~/src/server/auth/helpers/permissions.js'

const mapAuth = (request) => {
  return {
    isAuthenticated: request.auth.isAuthenticated,
    isAnonymous: !request.auth.isAuthenticated,
    isAdminUser:
      request.auth.isAuthenticated && isInRole(request.auth.credentials, admin)
  }
}

export default mapAuth
