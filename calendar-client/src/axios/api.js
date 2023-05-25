import axios from 'axios';

export const API_URL = axios.create({
    baseURL: 'https://anima-calendar-server.onrender.com/api/events',
});
