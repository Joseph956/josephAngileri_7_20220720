import axios from "axios";

const apiPosts = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

function findAllPublished(token) {
    return apiPosts.get('/posts', {
        headers: {
            "Authorization": "BEARER" + token
        }
    });
}

export default {
    findAllPublished
}