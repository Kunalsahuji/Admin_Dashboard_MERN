import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", 
    withCredentials: true,
});

// Request Interceptor: Attach token to headers if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
