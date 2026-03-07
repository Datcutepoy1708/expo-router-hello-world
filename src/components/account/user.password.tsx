import { updateUserPasswordAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import ShareInput from "../input/share.input";
import { UpdatePasswordSchema } from "@/utils/validate.schema";

const UserPassword = () => {
    const formikRef = useRef<FormikProps<any>>(null);
    const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
        const res = await updateUserPasswordAPI(currentPassword, newPassword);
        if (res.data) {
            Toast.show("Cập nhật thông tin thành công", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR
                    .GREEN,
                opacity: 1,
            })
            formikRef?.current?.resetForm()
        } else {
            const m = Array.isArray(res.message) ? res.message[0] : res.message
            Toast.show(m, {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORAGE,
                opacity: 1,
                position: Toast.positions.TOP
            })
        }
    }
    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                    <Formik
                        validationSchema={UpdatePasswordSchema}
                        innerRef={formikRef}
                        initialValues={{
                            currentPassword: "",
                            newPassword: "",
                            confirmNewPassword: ""
                        }}
                        onSubmit={values => handleUpdatePassword(
                            values?.currentPassword ?? "",
                            values?.newPassword ?? ""
                        )}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                            <View style={{ marginTop: 20, gap: 20 }}>
                                <ShareInput
                                    title="Mật khẩu hiện tại"
                                    label="Mật khẩu hiện tại"
                                    error={errors.currentPassword}
                                    touched={touched.currentPassword}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('currentPassword')}
                                    onBlur={handleBlur('currentPassword')}
                                    value={values.currentPassword}
                                />

                                <ShareInput
                                    title="Mật khẩu mới"
                                    label="Mật khẩu mới"
                                    error={errors.newPassword}
                                    touched={errors.newPassword}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                />

                                <ShareInput
                                    title="Xác nhận mật khẩu mới"
                                    label="Xác nhận mật khẩu mới"
                                    error={errors.newPassword}
                                    touched={errors.newPassword}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("confirmNewPassword")}
                                    onBlur={handleBlur('confirmNewPassword')}
                                    value={values.confirmNewPassword}
                                />


                                <Pressable
                                    disabled={!(isValid && dirty)}
                                    onPress={handleSubmit as any}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.5 : 1,
                                        padding: 10,
                                        marginVertical: 40,
                                        marginHorizontal: 10,
                                        backgroundColor: isValid && dirty ? APP_COLOR.ORAGE : APP_COLOR.GRAY,
                                        borderRadius: 3
                                    })}
                                >
                                    <Text style={{ textAlign: "center", color: "white" }}>Thay đổi mật khẩu</Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}
export default UserPassword;