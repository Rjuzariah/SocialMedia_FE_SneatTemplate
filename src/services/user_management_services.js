import axios from 'axios';

export async function getAllUsers() {
    const response = await axios.get('https://localhost:7277/api/Users');
    return response.data
}
