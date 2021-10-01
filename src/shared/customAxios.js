import axios from 'axios';
import storeRedux from "../globalState/storeRedux";

// dev
// const baseURL = 'http://localhost:5000';

// prod
const baseURL = "https://campaignapi.francis.center/"

const getToken = () => {
    const token = storeRedux.getState().auth?.access_token;
    return token;
}

const axiosInstance = axios.create({
    baseURL
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
},
    error => {
        return Promise.reject(error);
    })

axiosInstance.interceptors.response.use((AxiosResponse) => {
    return AxiosResponse
}, error => {
    return Promise.reject(error);
})

export default axiosInstance;