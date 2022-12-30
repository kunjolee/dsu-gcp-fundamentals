import axios from 'axios';

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

export const apiUser = axios.create({
    baseURL: `${import.meta.env.VITE_CLOUD_FUNCTION_API}/api/user`
})