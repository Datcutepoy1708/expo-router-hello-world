import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { updateUserAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateSchema } from "@/utils/validate.schema";
import { Formik } from "formik";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";


const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})

const UserPage = () => {
    const { theme, appState } = useCurrentApp();
    const { setAppState } = useCurrentApp();
    const backend = Platform.OS === "android" ? process.env.EXPO_PUBLIC_ANDROID_API_URL : process.env.EXPO_PUBLIC_IOS_API_URL;
    const baseImage = `${backend}/images/avatar`

    const handleUpdateUser = async (name: string, phone: string) => {
        if (appState?.user._id) {
            const res = await updateUserAPI(appState.user._id, name, phone);
            if (res.data) {
                Toast.show("Cập nhật thông tin thành công", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.GREEN,
                    opacity: 1,
                })

                setAppState({
                    ...appState,
                    user: {
                        ...appState.user,
                        name: name,
                        phone: phone
                    }
                })
            }
        }
    }

    // Check if user data exists
    if (!appState || !appState.user) {
        return (
            <View style={[styles.container, { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }]}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                    Vui lòng đăng nhập để xem thông tin tài khoản
                </Text>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}  // ← điều chỉnh con số này
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    <View style={{ alignItems: "center", gap: 5 }}>
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={{ uri: `${baseImage}/${appState.user.avatar}` }}
                        />
                        <Text>{appState.user.name}</Text>
                    </View>
                    <Formik
                        validationSchema={UpdateSchema}
                        initialValues={{
                            name: appState.user.name,
                            email: appState.user.email,
                            phone: appState.user.phone
                        }}
                        onSubmit={values => handleUpdateUser(values?.name ?? "", values?.phone ?? "")}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                            <View style={{ marginTop: 20, gap: 20 }}>
                                <ShareInput
                                    title="Họ tên"
                                    label="Họ tên"
                                    value={appState.user.name}
                                    error={errors.name}
                                    touched={touched.name}
                                />
                                <ShareInput
                                    title="Email"
                                    label="Email"
                                    value={appState.user.email}
                                    editable={false}
                                    keyboardType="email-address"
                                />
                                <ShareInput
                                    title="Số điện thoại"
                                    label="Số điện thoại"
                                    keyboardType="phone-pad"
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    error={errors.phone}
                                    touched={touched.phone}
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
                                    <Text style={{ textAlign: "center", color: "white" }}>Lưu thay đổi</Text>
                                </Pressable>
                            </View>
                        )}

                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default UserPage;