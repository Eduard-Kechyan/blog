import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://test-003-3ea3e.firebaseio.com/blog'
});

export default instance;