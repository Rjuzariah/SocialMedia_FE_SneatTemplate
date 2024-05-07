import TokenService from './token_services';
// import store from '@/store'
import axios from 'axios';
import axiosRetry from 'axios-retry';

// initialize the axiosRetry library
axiosRetry(axios)
const ApiService = {

  // Stores the 401 interceptor position so that it can be later ejected when needed
  _401interceptor: null,

  // Stores the 403 interceptor position so that it can be later ejected when needed
  _403interceptor: null,

  // Stores the 500 interceptor position so that it can be later ejected when needed
  _500interceptor: null,

  _serverRebootInterceptor: null,

  // Stores the connection error retry count if the server encounters a cursor connection closed error
  connectionErrorRetryCount: 0,

  // Stores the connection error retry count limit to rety if the server encounters a cursor connection closed error
  connectionErrorRetryCountLimit: 10,

  init (baseURL) {
    axios.defaults.baseURL = baseURL
    // store.dispatch('auth/init', TokenService.getToken())
  },

  setHeader () {
    axios.defaults.headers.common.Authorization = `Bearer ${TokenService.getToken()}`
  },

  removeHeader () {
    axios.defaults.headers.common = {}
  },

  options (resource, params = null) {
    // Resets the connection retry count
    this.connectionErrorRetryCount = 0
    return axios.options(resource, {
      params
    })
  },

  get (resource, params = null, options = {}) {
    // Resets the connection retry count
    this.connectionErrorRetryCount = 0
    return axios.get(resource, {
      params,
      ...options
    })
  },

  post (resource, data, params = null) {
    // Resets the connection retry count
    this.connectionErrorRetryCount = 0
    return axios.post(resource, data, {
      params
    })
  },

  put (resource, data, params = null) {
    // Resets the connection retry count
    this.connectionErrorRetryCount = 0
    return axios.put(resource, data, {
      params
    })
  },

  delete (resource) {
    // Resets the connection retry count
    this.connectionErrorRetryCount = 0
    return axios.delete(resource)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
  **/
  customRequest (data, connectionErrorRetry = false) {
    if (!connectionErrorRetry) {
      // Resets the connection retry count if the request is not due to retry
      this.connectionErrorRetryCount = 0
    }
    return axios(data)
  },

  /**
   * Gets the connection error retry count limit
   * @returns {number} connectionErrorRetryCountLimit
   */
  getConnectionErrorRetryCountLimit () {
    return this.connectionErrorRetryCountLimit
  },

//   mount401Interceptor () {
//     this._401interceptor = axios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response && error.response.status === 401) {
//           if (error.response.data && error.response.data.code === 'user_inactive') {
//             // Logout user if user is set to inactive
//             store.dispatch('auth/logout')
//             throw error
//           } else if (error.config.url.includes('auth/refresh')) {
//             // Refresh token has failed. Logout the user
//             store.dispatch('auth/logout', { audit: false })
//             // return without throwing error
//             return
//           } else {
//             // Refresh the access token
//             try {
//               await store.dispatch('auth/refreshToken')
//               const config = {
//                 method: error.response.config.method,
//                 url: error.response.config.url
//               }

//               if (typeof error.response.config.data !== 'undefined') {
//                 try {
//                   config.data = JSON.parse(error.response.config.data)
//                 } catch {
//                   config.data = error.response.config.data
//                 }
//               }

//               if (typeof error.response.config.params !== 'undefined') {
//                 config.params = error.response.config.params
//               }

//               if (typeof error.response.config.responseType !== 'undefined') {
//                 config.responseType = error.response.config.responseType
//               }

//               // Remove pre-prepended baseURL
//               config.url = config.url.replace(new RegExp(`^${axios.defaults.baseURL}`), '')
//               // Retry the original request
//               return this.customRequest(config)
//             } catch (e) {
//               // Refresh has failed, throw the error as the logout will be handled by the refresh token api
//               throw error
//             }
//           }
//         }

//         // If error was not 401 just reject as is to the next interceptor
//         throw error
//       }
//     )
//   },

//   mount403Interceptor () {
//     this._403interceptor = axios.interceptors.response.use(
//       (response) => {
//         return response
//       },
//       async (error) => {
//         if (error.response && error.response.status === 403) {
//           if (error.config.url.includes('auth/check-permission')) {
//             // if 403 is thrown by check-permission api, return the error response from backend
//             return error.response
//           } else if (error.response.data) {
//             if (error.response.data.code === 'maintenance') {
//               store.dispatch('auth/showInterceptorToastAndLogout', {
//                 toastTitle: Constants.LOCAL.API_SERVICE.MAINTENANCE_MODE_TOAST_TITLE,
//                 toastMessage: Constants.LOCAL.API_SERVICE.MAINTENANCE_MODE_TOAST_MSG
//               })
//             } else if (error.response.data.code === 'invalid_token') {
//               store.dispatch('auth/showInterceptorToastAndLogout', {
//                 toastTitle: Constants.LOCAL.API_SERVICE.INVALID_TOKEN_TOAST_TITLE,
//                 toastMessage: Constants.LOCAL.API_SERVICE.INVALID_TOKEN_TOAST_MSG
//               })
//             } else if (error.response.data.code === 'invalid_license') {
//               store.dispatch('auth/showInterceptorToastAndForceLogout', {
//                 toastTitle: Constants.LOCAL.API_SERVICE.LICENSE_INVALID_TOAST_TITLE,
//                 toastMessage: Constants.LOCAL.API_SERVICE.LICENSE_INVALID_TOAST_MSG
//               })
//             }

//             // Unmount the server reboot interceptor if the server restarting interceptor is running
//             // as the user will be logged out due to maintenance or invalid token
//             this.unmountServerRebootInterceptor()
//           }
//           // Reject the error to terminate the ongoing API request
//           throw error
//         }
//         // If error was not 403 just reject as is to the next interceptor
//         throw error
//       }
//     )
//   },

  mount500Interceptor () {
    this._500interceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (error.response && error.response.status === 500) {
          // If error is 'connection_error',retry the request again as server DB cursor might have closed
          if (error.response.data && error.response.data.code === 'connection_error') {
            if (this.connectionErrorRetryCount < this.getConnectionErrorRetryCountLimit()) {
              // Wait 1 second before retrying
              await new Promise(resolve => setTimeout(resolve, 1500))
              // Retry the original request and increment count by 1
              this.connectionErrorRetryCount += 1
              return this.customRequest(error.config, true)
            }
          }
        }
        // If other errors, just throw as it is to the next interceptor
        throw error
      }
    )
  },

  unmount401Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
    this._401interceptor = null
  },

  unmount403Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._403interceptor)
    this._403interceptor = null
  },

  unmount500Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._500interceptor)
    this._500interceptor = null
  },

  mountServerRebootInterceptor () {
    this._serverRebootInterceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        // do not retry the request when backend returning some response data (e.g. Request failed with status code 401)
        if (error.response) {
          return error
        }

        // reduce timeout before try again
        error.config.timeout = 5000

        // Wait 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1500))

        // retry request
        return axios.request(error.config)
      }
    )
  },

  unmountServerRebootInterceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._serverRebootInterceptor)
    this._serverRebootInterceptor = null
  }
}

// Register the API service to mount the 403 interceptor by default
// ApiService.mount403Interceptor()
ApiService.mount500Interceptor()

export default ApiService
