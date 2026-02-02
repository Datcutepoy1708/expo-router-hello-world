import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useState } from "react";
import { loginAPI } from "@/utils/api";
import Toast from "react-native-root-toast";

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
    const handleLogin = async () => {
        try {
            const res = await loginAPI(email, password);
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
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 600, marginVertical: 30 }}>Đăng Nhập</Text>
                </View>
                <ShareInput label="Email" keyboardType="email-address" value={email} setValue={setEmail} />
                <ShareInput label="Mật khẩu" secureTextEntry={true} value={password} setValue={setPassword} />
                <View style={{ marginVertical: 10 }}></View>
                <ShareButton
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
            </View>
        </SafeAreaView>
    )
}
export default Login;