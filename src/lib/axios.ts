import axios from "axios";

const baseURL = 'http://localhost:8080';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTIyNTI5MzA5OTg1NDczNDQ5MzMiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTcyMzkwMDM3Nn0.cU4AbAXEVtgIByv5y1sEzkmyEXME9n1Q_JOfdb8ekXQ';

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