import axios from 'axios';

export async function getRoles() {
    const response = await axios.get('https://localhost:7277/api/Roles');
    return response.data
}
