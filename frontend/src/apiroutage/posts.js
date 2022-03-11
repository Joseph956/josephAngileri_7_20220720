import axios from "axios";

const apiPosts = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

function findAllPublished() {
    return apiPosts.get('/posts', {
        headers: {
            "Authorization": "BEARER" + this.$store.state.user.token,
        },
    });
}

export default {
    findAllPublished
}