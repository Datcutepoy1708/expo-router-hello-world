import * as Yup from 'yup'
export const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password cần tối thiểu 6 kí tự')
        .max(50, 'Password tối đa 50 kí tự')
        .required('password không được để trống'),
    email: Yup.string().email('Định dạng email không hợp lệ').required('Email không được để trống'),
});

export const SignUpSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password cần tối thiểu 6 kí tự')
        .max(50, 'Password tối đa 50 kí tự')
        .required('password không được để trống'),
    email: Yup.string().email('Định dạng email không hợp lệ').required('Email không được để trống'),
    name: Yup.string().required("Name không được để trống")
});

export const UpdateSchema = Yup.object().shape({
    name: Yup.string().required("Name không được để trống"),
    phone: Yup.string().required("Số điện thoại không được để trống")
})

export const UpdatePasswordSchema = Yup.object({
    currentPassword: Yup.string()
        .min(6, 'Mật khẩu hiện tại cần tối thiểu 6 kí tự')
        .max(50, 'Mật khẩu tối đa 50 kí tự')
        .required('Trường này không được để trống'),
    newPassword: Yup
        .string()
        .required('Password không được để trống')
        .min(6, 'Mật khẩu mới tối thiểu 6 kí tự')
        .max(50, 'Mật khẩu tối đa 50 kí tự'),
    confirmNewPassword: Yup
        .string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')  // ← sửa tên ref
});

export const RequestPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Định dạng email không hợp lệ')
        .required('Email không dược để trống')
})

export const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password tối thiểu 6 kí tự')
        .max(50, 'Password tối đa 50 kí tự')
        .required('Password không được để trống'),
    confirmPassword: Yup.string()
        .required('confirmPassword không được để trống')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    code: Yup.string()
        .required('Code không được để trống')
})