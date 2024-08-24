import axios from "axios";

const baseURL = 'http://localhost:8080';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5dXllbzA0NDhAZ21haWwuY29tIiwiYXV0aCI6IiIsImV4cCI6MTcyNDU2NzA3N30.FwQv_t7BhHCq5WFI7yQJd38X-3j38hQJcyKs4ReKR5M';

// axios instance 생성
export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

// 요청 interceptor
axios.interceptors.request.use(config => {
    console.log('interceptor request')
    return config;
}, error => {
    console.log('interceptor request error')
    return Promise.reject(error);
});

// 응답 interceptor
axios.interceptors.response.use(response => {
    console.log('interceptor response')
    return response;
}, error => {
    console.log('interceptor response error')
    return Promise.reject(error);
});