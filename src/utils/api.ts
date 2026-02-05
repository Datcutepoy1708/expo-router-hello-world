import axios from '@/utils/axios.customize';

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

export const loginAPI= async(email:string, password:string) => {
    const url=`api/v1/auth/login`;
    return await axios.post<IBackendRes<IUserLogin>>(url,{username:email,password});
}