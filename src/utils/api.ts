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
    const res: any = await axios.post(url, {}, {
        headers: { delay: 3000 }
    });
    // backend: { statusCode, message, data: ITopRestaurant[] }
    return res?.data?.data ?? [];
}
export const getRestaurantByIdAPI = async (id: string): Promise<IRestaurant | null> => {
    // Thêm query parameter để populate menu và menuItem từ backend
    const url = `/api/v1/restaurants/${id}?populate=menu,menuItem`;
    const res: any = await axios.get(url, {
        headers: { delay: 3000 }
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

export const placeOrderAPI = (data: any) => {
    const url = `/api/v1/orders`;
    return axios.post<IBackendRes<IUserLogin>>(url, { ...data });
}

export const getOrderHistoryAPI = async (): Promise<IOrderHistory[]> => {
    const url = `/api/v1/orders`;
    const res: any = await axios.get(url);
    // backend: { statusCode, message, data: IOrderHistory[] }
    return res?.data?.data ?? [];
}

export const updateUserAPI = (_id: string, name: string, phone: string) => {
    const url = `/api/v1/users`;
    return axios.patch<IBackendRes<IUserLogin>>(url, { _id, name, phone })
}
export const updateUserPasswordAPI = (currentPassword: string, newPassword: string) => {
    const url = `/api/v1/users/password`;
    return axios.post<IBackendRes<IUserLogin>>(url, { currentPassword, newPassword });
}
export const requestPassswordAPI = (email: string) => {
    const url = `/api/v1/auth/retry-password`;
    return axios.post<IBackendRes<IUserLogin>>(url, { email })
}
export const forgotPasswordAPI = (code: string, email: string, password: string) => {
    const url = `/api/v1/auth/forgot-password`;
    return axios.post<IBackendRes<IUserLogin>>(url, { code, email, password })
}
export const getFavoriteRestaurantAPI = () => {
    const url = `/api/v1/likes?current=1&pageSize=10`;
    return axios.get<any>(url);
}
export const likeRestaunrantAPI = (restaurant: string, quantity: number) => {
    const url = `/api/v1/likes`;
    return axios.post<IBackendRes<IUserLogin>>(url, { restaurant, quantity });
}
export const getRestaurantByName = (name: string) => {
    const url = `/api/v1/restaurants?current=1&pageSize=10&name=/${name}/i`;
    return axios.get<IBackendRes<IModelPaginate<IRestaurant>>>(url);
}