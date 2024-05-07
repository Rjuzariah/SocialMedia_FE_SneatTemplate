const TOKEN_KEY = 'aToken'
const REFRESH_TOKEN_KEY = 'rToken'
const REFRESH_TOKEN_ROTATION_TIMER = 'rTokenRotationTimer'
const REFRESH_TOKEN_ROTATION_PERIOD_IN_MILLISECONDS = 'rTokenRotationPeriodInMilliseconds'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const TokenService = {
  getToken () {
    return localStorage.getItem(TOKEN_KEY)
  },

  saveToken (accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken () {
    localStorage.removeItem(TOKEN_KEY)
  },

  getRefreshToken () {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  saveRefreshToken (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    this.resetRefreshTokenRotationTimer()
  },

  removeRefreshToken () {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    // this.removeRefreshTokenRotationTimer()
  },

  removeRefreshTokenRotationTimer () {
    clearTimeout(localStorage.getItem(REFRESH_TOKEN_ROTATION_TIMER))
  },

  resetRefreshTokenRotationTimer () {
    // Set silent timer to retrieve new refresh token
    this.removeRefreshTokenRotationTimer()
    localStorage.setItem(REFRESH_TOKEN_ROTATION_TIMER, setTimeout(async () => {
      await store.dispatch('auth/refreshToken')
    }, this.getRefreshTokenRotationPeriodInMilliseconds()))
  },

  getRefreshTokenRotationPeriodInMilliseconds () {
    return localStorage.getItem(REFRESH_TOKEN_ROTATION_PERIOD_IN_MILLISECONDS)
  },

  saveRefreshTokenRotationPeriodInMilliseconds (refreshTokenRotationPeriodInMilliseconds) {
    localStorage.setItem(REFRESH_TOKEN_ROTATION_PERIOD_IN_MILLISECONDS, refreshTokenRotationPeriodInMilliseconds)
  }
}

export { REFRESH_TOKEN_KEY, REFRESH_TOKEN_ROTATION_PERIOD_IN_MILLISECONDS, REFRESH_TOKEN_ROTATION_TIMER, TOKEN_KEY }
export default TokenService
