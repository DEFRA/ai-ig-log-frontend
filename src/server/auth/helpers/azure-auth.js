import { config } from '~/src/config/index.js'
import * as msal from '@azure/msal-node'
import { log } from 'console'

const authConfig = config.get('auth')

const msalLogging = config.isProduction
  ? {}
  : {
      loggerCallback(loglevel, message) {
        log(message)
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose
    }

const msalClientApplication = new msal.ConfidentialClientApplication({
  auth: authConfig.azure,
  system: { loggerOptions: msalLogging }
})

const getAuthenticationUrl = async () => {
  const authCodeUrlParameters = {
    prompt: 'select_account', // Force the MS account select dialog
    redirectUri: authConfig.redirectUrl
  }
  const authUrl = await msalClientApplication.getAuthCodeUrl(
    authCodeUrlParameters
  )
  return authUrl
}

const authenticate = async (redirectCode, cookieAuth) => {
  const token = await msalClientApplication.acquireTokenByCode({
    code: redirectCode,
    redirectUri: authConfig.redirectUrl
  })

  cookieAuth.set({
    scope: token.idTokenClaims.roles,
    account: token.account
  })
}

const refresh = async (account, cookieAuth, forceRefresh = true) => {
  const token = await msalClientApplication.acquireTokenSilent({
    account,
    forceRefresh
  })

  cookieAuth.set({
    scope: token.idTokenClaims.roles,
    account: token.account
  })
  return token.idTokenClaims.roles
}

const logout = async (account) => {
  try {
    await msalClientApplication.getTokenCache().removeAccount(account)
  } catch (err) {
    log('Unable to end session', err)
  }
}

export { getAuthenticationUrl, authenticate, refresh, logout }
