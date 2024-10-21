import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL // Base URL for API
});

// Add a request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or wherever you store it
        const token = localStorage.getItem('authToken');
        
        if (token) {
            // If token exists, set it in the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle error
        return Promise.reject(error);
    }
);

export default axiosInstance;