import axios from '@/utils/axios.customize';

export const registerAPI = async (fullname:string, email: string, password: string) => {
    const url = `/api/v1/auth/register`;
    return await axios.post<IBackendRes<IRegister>>(url, { fullname,email,password });
}

export const verifyCodeAPI = async (email: string, code: string) => {
    const url = `/api/v1/auth/verify-code`;
    return await axios.post<IBackendRes<IRegister>>(url, { email, code });
}