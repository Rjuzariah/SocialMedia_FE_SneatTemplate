import axios from 'axios';
import { socialMediaStore } from '../store.js';


export async function getAllPost() {
    try {
        const response = await axios.get('https://localhost:7277/api/Posts');
        return response

    } catch (error) {
        if (error.response) {
            return {
                'status': error.response.data.status,
                'title': error.response.data.title,
                'errorList': error.response.data.errors,
            }
          } else {
            // Something happened in setting up the request that triggered an error
            return {
                'status': 0,
                'title': "Authentication Fail",
                'errorList': [],
            }
          }
    }
}

export async function createPost(description) {
    try {
        const response = await axios.post('https://localhost:7277/api/Posts', {
        // Specify the data to be sent in the request body
            description: description,
        });
        return response
    } catch (error) {
        const errorMessage = socialMediaStore().constructError(error)
        socialMediaStore().error = errorMessage
    }
}

export async function CountNumberOfPost(description) {
    const response = await axios.get('https://localhost:7277/api/Posts/CountNumberOfPost');
    return response.data
}

  
