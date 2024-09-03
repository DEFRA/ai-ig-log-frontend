import permissions from '~/src/server/auth/helpers/permissions.js'
import { v4 as uuidv4 } from 'uuid'
import devAccount from '~/src/server/auth/helpers/dev-account.js'

const getAuthenticationUrl = () => {
  return '/dev-auth'
}

const currentRole = permissions.admin // standard

const authenticate = (redirectCode, cookieAuth) => {
  cookieAuth.set({
    scope: [currentRole],
    account: devAccount
  })
}

const refresh = (account, cookieAuth) => {
  cookieAuth.set({
    scope: [currentRole],
    account: devAccount
  })

  return [currentRole]
}

const logout = () => {
  devAccount.homeAccountId = uuidv4()
}

export { getAuthenticationUrl, authenticate, refresh, logout }
