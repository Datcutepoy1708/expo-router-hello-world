import * as Yup from 'yup'
export const LoginSchema = Yup.object().shape({
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('password không được để trống'),
    email: Yup.string().email('Định dạng email không hợp lệ').required('Email không được để trống'),
});