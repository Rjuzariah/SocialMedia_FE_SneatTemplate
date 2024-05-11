import axios from 'axios';
import TokenService from './token_services';
// import { getLoginUser } from './user_management_services';


class AuthenticationError extends Error {
  constructor (error) {
    super(error)
    this.name = this.constructor.name
    this.status = error.response.data.status
    this.title = error.response.data.title
    this.errorList = error.response.data.errors || []
  }
}

export async function register(data) {
  try{
    const response = await axios.post('https://localhost:7277/register', {
        // Specify the data to be sent in the request body
        email: data.email,
        password: data.password
      });
    return response
  } catch (error) {
    const errorData = {
      'status': error.response.data.status,
      'title': error.response.data.title,
      'errorList': error.response.data.errors,
    }
    return errorData
    // throw new AuthenticationError(error)
  }
    
}

export async function login(data) {
    try {
      const response = await axios.post('https://localhost:7277/login', {
        // Specify the data to be sent in the request body
        email: data.email,
        password: data.password
      });

      TokenService.saveRefreshTokenRotationPeriodInMilliseconds(response.data.expiresIn)
      TokenService.saveToken(response.data.accessToken)
      TokenService.saveRefreshToken(response.data.refreshToken)
      axios.defaults.headers.common.Authorization = `Bearer ${TokenService.getToken()}`

      // getLoginUser()
      return response
    } catch (error) {
      const errorData = {
        'status': error.response.data.status,
        'title': error.response.data.title,
        'errorList': error.response.data.errors,
      }
      return errorData
    }
}
  
// export async function refresh(description) {
//     const response = await axios.post('https://localhost:7277/refresh', {
//         // Specify the data to be sent in the request body
//         description: description,
//       });
//     return response.data
// }
