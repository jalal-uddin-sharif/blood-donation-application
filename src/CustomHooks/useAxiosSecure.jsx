import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error('VITE_API_URL is missing. Add it to client/.env');
}

const axiosSecure = axios.create({
    baseURL: apiUrl,
 
})

axiosSecure.interceptors.request.use(function (config){
    const token = localStorage.getItem('access-token')
    if (token) {
       config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, function (error){
    return Promise.reject(error)
})

axiosSecure.interceptors.response.use(function(response){
    return response;
}, async(error)=>{
    const status = error.response?.status;
    if(status === 401 || status === 403){
        localStorage.removeItem('access-token')
    }
    return Promise.reject(error)
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;
