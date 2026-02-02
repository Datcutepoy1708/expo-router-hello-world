import axios from "axios";
import { Platform } from "react-native";

const backend = Platform.OS === "android" ? process.env.EXPO_PUBLIC_ANDROID_API_URL : process.env.EXPO_PUBLIC_IOS_API_URL
console.log(">> check backend: ", backend);
const instance = axios.create({
    baseURL: backend
})

instance.interceptors.request.use(
    function (config) {
        config.headers["delay"]=5000;
        // Do something before the request is sent
        return config;
    },
    function (error) {
        // Do something with the request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        if (error?.response?.data) {
            return error?.response?.data
        }
        console.log(">> run error here")
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default instance;