import { config } from '~/src/config/index.js'
import mapAuth from '~/src/server/auth/helpers/map-auth.js'
import getUser from '~/src/server/auth/helpers/get-user.js'

const authConfig = config.get('auth')

const loadAuthModule = async () => {
  if (authConfig.enabled) {
    return import('~/src/server/auth/helpers/azure-auth.js')
  } else {
    return import('~/src/server/auth/helpers/dev-auth.js')
  }
}

const auth = await loadAuthModule()

export default {
  ...auth,
  mapAuth,
  getUser
}
