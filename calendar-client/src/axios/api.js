import axios from 'axios';

export const API_URL = axios.create({
    baseURL: 'http://localhost:5000/api/events',
});
