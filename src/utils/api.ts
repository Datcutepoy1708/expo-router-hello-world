import axios from '@/utils/axios.customize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerAPI = async (name: string, email: string, password: string) => {
    const url = `/api/v1/auth/register`;
    return await axios.post<IBackendRes<IRegister>>(url, { name, email, password });
}

export const verifyCodeAPI = async (email: string, code: string) => {
    const url = `/api/v1/auth/verify-code`;
    return await axios.post<IBackendRes<IRegister>>(url, { email, code });
}

export const resendCodeAPI = async (email: string) => {
    const url = `/api/v1/auth/verify-email`;
    return await axios.post<IBackendRes<IRegister>>(url, { email });
}

export const loginAPI = async (email: string, password: string) => {
    const url = `api/v1/auth/login`;
    return await axios.post<IBackendRes<IUserLogin>>(url, { username: email, password });
}

export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {}
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1]
            });
            console.log(JSON.stringify(asyncStorage, null, 2));
        });
    });
};

export const getAccountAPI = () => {
    const url = `/api/v1/auth/account`;
    return axios.get<IBackendRes<IUserLogin>>(url)
}

export const getTopRestaurant = async (ref: string): Promise<ITopRestaurant[]> => {
    const url = `/api/v1/restaurants/${ref}`;
    const res: any = await axios.post(url);
    // backend: { statusCode, message, data: ITopRestaurant[] }
    return res?.data?.data ?? [];
}