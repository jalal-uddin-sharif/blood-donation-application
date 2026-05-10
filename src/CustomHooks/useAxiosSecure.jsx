import axios from 'axios';

const axiosSecure = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        'https://blood-donation-server-pria.onrender.com',
 
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
