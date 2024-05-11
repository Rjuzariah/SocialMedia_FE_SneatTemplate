import axios from 'axios';
import { socialMediaStore } from '../store.js';

export async function getAllUsers() {
    const response = await axios.get('https://localhost:7277/api/Users');
    return response.data
}

export async function getUserbyId(user_id) {
    const response = await axios.get('https://localhost:7277/api/Users/'+user_id);
    return response.data
}

export async function getLoginUser() {
    try {
        const response = await axios.get('https://localhost:7277/api/Users/GetLoginUser/');
        socialMediaStore().userLoginInfo = response.data
    } catch (error) {
        const errorMessage = socialMediaStore().constructError(error)
        socialMediaStore().error = errorMessage
    }
}

export async function createUser(data) {
    const response = await axios.post('https://localhost:7277/api//Users', {
        // Specify the data to be sent in the request body
        userName: data.userName,
        email: data.email,
        password: data.password || "",
        postLimitNumber: data.postLimitNumber,
        roles: data.roles
      });
    return response
}

export async function editUser(data) {
    const response = await axios.put('https://localhost:7277/api/Users/'+data.id, {
        // Specify the data to be sent in the request body
        id:data.id,
        userName: data.userName,
        email: data.email,
        password: data.password || "",
        postLimitNumber: data.postLimitNumber,
        roles: data.roles
      });
    return response
}
