import axios from 'axios';

export async function getAllPost() {
    const response = await axios.get('https://localhost:7277/api/Posts');
    return response.data
}

export async function createPost(description) {
    const response = await axios.post('https://localhost:7277/api/Posts', {
        // Specify the data to be sent in the request body
        description: description,
      });
    return response.data
}
  
