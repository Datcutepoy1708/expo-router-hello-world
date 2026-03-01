import axios from '@/utils/axios.customize';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const printAsyncStORAGE = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStORAGE: any = {}
            stores?.map((result, i, store) => {
                asyncStORAGE[store[i][0]] = store[i][1]
            });
            console.log(JSON.stringify(asyncStORAGE, null, 2));
        });
    });
};

export const getAccountAPI = () => {
    const url = `/api/v1/auth/account`;
    return axios.get<IBackendRes<IUserLogin>>(url)
}

export const getTopRestaurant = async (ref: string): Promise<ITopRestaurant[]> => {
    const url = `/api/v1/restaurants/${ref}`;
    const res: any = await axios.post(url,{},{
        headers: {delay:3000}
    });
    // backend: { statusCode, message, data: ITopRestaurant[] }
    return res?.data?.data ?? [];
}
export const getRestaurantByIdAPI = async (id: string): Promise<IRestaurant | null> => {
    // Thêm query parameter để populate menu và menuItem từ backend
    const url = `/api/v1/restaurants/${id}?populate=menu,menuItem`;
    const res: any = await axios.get(url,{
        headers: {delay:3000}
    });
    const restaurant = res?.data?.data;
    
    return restaurant ?? null;
}
export const processDataRestaurantMenu = (restaurant: IRestaurant | null) => {
    if (!restaurant) return [];
    return restaurant?.menu?.map((menu, index) => {
        return {
            index,
            key: menu._id,
            title: menu.title,
            data: menu.menuItem?.map((item) => ({
                ...item,
                image: item.image || '' // Đảm bảo image luôn có giá trị (ít nhất là chuỗi rỗng)
            })) || []
        }
    }) || []
}