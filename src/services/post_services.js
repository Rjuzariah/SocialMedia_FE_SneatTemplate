import axios from 'axios';

export function getAllPost() {
    axios.get('https://localhost:7277/api/Posts')
    .then(response => {
        // Handle the response
        console.log(response.data);
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the request:', error);
    });

}
