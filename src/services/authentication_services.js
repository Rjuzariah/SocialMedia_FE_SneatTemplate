import axios from 'axios';

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

export async function login(description) {
    const response = await axios.post('https://localhost:7277/login', {
        // Specify the data to be sent in the request body
        description: description,
      });
    return response.data
}
  
export async function refresh(description) {
    const response = await axios.post('https://localhost:7277/refresh', {
        // Specify the data to be sent in the request body
        description: description,
      });
    return response.data
}
