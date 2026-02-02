import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useState } from "react";
import { loginAPI } from "@/utils/api";
import Toast from "react-native-root-toast";
import { Button } from "react-native";
import { Formik } from 'formik';
import { LoginSchema } from "@/utils/validate.schema";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        marginHorizontal: 20,
        gap: 10
    }
})
const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await loginAPI(email, password);
            setLoading(false)
            if (res.data) {
                router.navigate("/(tabs)")
                // success
            }
            else {
                const m = Array.isArray(res.message) ? res.message[0] : res.message
                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORAGE,
                    opacity: 1,
                    position: Toast.positions.TOP
                })
                if (res.statusCode === 400) {
                    router.replace({
                        pathname: "/(auth)/verify",
                        params: { email: email, isLogin: 1 }
                    })
                }
            }
        } catch (error: any) {
            console.log(">>>Check error: " + error.message)
        }
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 600, marginVertical: 30 }}>Đăng Nhập</Text>
                </View>
                <ShareInput label="Email" keyboardType="email-address" value={email} setValue={setEmail} />
                <ShareInput label="Mật khẩu" secureTextEntry={true} value={password} setValue={setPassword} />
                <View style={{ marginVertical: 10 }}></View>
                <ShareButton
                    loading={loading}
                    title="Đăng nhập"
                    onPress={handleLogin}
                    textStyle={{ color: "#fff", paddingVertical: 5, textTransform: "uppercase" }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        marginHorizontal: 50,
                        paddingVertical: 10,
                        backgroundColor: APP_COLOR.ORAGE,
                    }}
                    pressStyle={{ alignSelf: "stretch" }}
                />
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        gap: 10,
                        justifyContent: "center"
                    }}
                >
                    <Text style={{ color: "black" }}>Chưa có tài khoản?</Text>
                    <Link href={"/(auth)/signup"}>
                        <Text style={{ color: "black", textDecorationLine: "underline" }}>
                            Đăng kí
                        </Text>
                    </Link>
                </View>
                <SocialButton />
            </View> */}
            <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => console.log("check values = ", values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ margin: 10 }}>
                        <Text>Email</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: "#ccc" }}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
                        <View style={{ marginVertical: 10 }}></View>
                        <Text>Password</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: "#ccc" }}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
                        <View style={{ marginVertical: 10 }}></View>
                        <Button onPress={handleSubmit as any} title="Submit" />
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}
export default Login;