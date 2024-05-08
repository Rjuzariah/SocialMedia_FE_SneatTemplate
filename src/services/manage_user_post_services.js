import axios from 'axios';

export async function getManageUserPost() {
    const response = await axios.get('https://localhost:7277/api/ManageUserPosts');
    return response.data
}

export async function createManageUserPost(postLimitNumber) {
    const response = await axios.post('https://localhost:7277/api/ManageUserPosts', {
        // Specify the data to be sent in the request body
        postLimitNumber: postLimitNumber,
      });
    return response.data
}

export async function editManageUserPost(postLimitNumber) {
    const response = await axios.put('https://localhost:7277/api/ManageUserPosts', {
        // Specify the data to be sent in the request body
        postLimitNumber: postLimitNumber,
      });
    return response.data
}
